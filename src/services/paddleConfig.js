import { initializePaddle } from '@paddle/paddle-js';

export async function setupPaddle() {
  try {
    const paddleInstance = await initializePaddle({
      environment: 'sandbox', 
      token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN,
      checkout: {
        settings: {
          displayMode: 'overlay',
          theme: 'light',
        }
      }
    });
    
    return paddleInstance;
  } catch (error) {
    console.error("Gagal inisialisasi Paddle:", error);
    return null;
  }
}