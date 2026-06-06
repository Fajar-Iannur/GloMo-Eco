import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Paddle, Environment } from "npm:@paddle/paddle-node-sdk";

Deno.serve(async (req) => {
  console.log("📞 TELEPON DARI PADDLE MASUK!");

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const signature = req.headers.get('paddle-signature') || '';
    const rawBody = await req.text(); 
    
    // api key
    const webhookSecret = Deno.env.get('PADDLE_WEBHOOK_SECRET') || '';
    const paddleApiKey = Deno.env.get('PADDLE_API_KEY') || '';

    // inisialisasi
    const paddle = new Paddle(paddleApiKey, { environment: Environment.sandbox }); 
    
    // verif
    try {
      paddle.webhooks.unmarshal(rawBody, webhookSecret, signature);
    } catch (err) {
      console.error("❌ TANDA TANGAN PALSU! Telepon ditolak.");
      return new Response("Unauthorized", { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    console.log("Menerima event AMAN:", payload.event_type);

    if (payload.event_type === 'transaction.completed') {
      const data = payload.data || {};
      const transactionId = data.id || "txn_unknown";
      const customerId = data.customer_id;

      let email = "email_tersembunyi@glomo.eco";

      if (customerId) {
        try {
          console.log(`Menarik data email untuk KTP: ${customerId}...`);
          const customerData = await paddle.customers.get(customerId);
          email = customerData.email || email; 
        } catch (err) {
          console.error("Gagal narik email pelanggan dari Paddle:", err);
        }
      }

      console.log(`Transaksi siap diproses untuk: ${email} (ID: ${transactionId})`);

      // take a note supabase
      const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data: existingUser } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('email', email)
        .single();

      let dbError;

      if (existingUser) {
        console.log(`User ${email} udah ada. Melakukan UPDATE data...`);
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({ status: 'active', transaction_id: transactionId })
          .eq('email', email);
        dbError = updateError;
      } else {
        console.log(`User ${email} adalah member baru. Melakukan INSERT data...`);
        const { error: insertError } = await supabase
          .from('subscriptions')
          .insert({ email: email, status: 'active', transaction_id: transactionId });
        dbError = insertError;
      }

      if (dbError) {
        console.error("❌ Gagal nyatet ke database:", dbError.message);
      } else {
        console.log("✅ Berhasil memperbarui buku VIP di database!");
      }
    }

    return new Response(JSON.stringify({ message: "Resepsionis udah nyatet di buku!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Gagal memproses webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});