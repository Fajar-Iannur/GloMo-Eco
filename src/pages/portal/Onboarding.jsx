import { useState } from 'react';
import { calculateCommuteEmissions } from '../../utils/carbonCalculator';
import { supabase } from '../../services/supabaseClient';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    department: '',
    workMode: 'hybrid', // remote, hybrid, office
    commuteMethod: 'public-transit', // car, EV, public-transit, bike-walk
    commuteDistance: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let daysOnSite = 0;
    if (formData.workMode === 'office') daysOnSite = 20; 
    else if (formData.workMode === 'hybrid') daysOnSite = 10;
    else if (formData.workMode === 'remote') daysOnSite = 0;
    // start the calculator
    const emissions = calculateCommuteEmissions(
      Number(formData.commuteDistance),
      formData.commuteMethod,
      daysOnSite
    );

    const finalPayload = {
      full_name: formData.fullName,
      department: formData.department,
      work_mode: formData.workMode,
      commute_method: formData.commuteMethod,
      commute_distance: Number(formData.commuteDistance),
      emissions_kg: emissions.kg,
      emissions_mt: emissions.mt,
     /* timestamp: new Date().toISOString() */
    };
    try {
      const { data, error } = await supabase
        .from('Employees')
        .insert([finalPayload]);

      if (error) throw error;

      alert(`Sukses tersimpan di Database!\nEstimasi Emisi: ${emissions.kg} kg CO2e / bulan.`);
      
      // Opsional: Reset form setelah sukses
      setStep(1);
      setFormData({
        fullName: '',
        department: '',
        workMode: 'hybrid',
        commuteMethod: 'public-transit',
        commuteDistance: ''
      });

    } catch (error) {
      alert(`Gagal menyimpan data: ${error.message}`);
      console.error("Error Supabase:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Container Card - Optimized for Mobile Screen */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between min-h-130">
        
        {/* Header Block */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-bl-full rounded-tr-full rounded-tl-sm rounded-br-sm rotate-45"></div>
              <span className="font-bold text-gray-800 text-sm">SustainaTrack</span>
            </div>
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              Step {step} of 3
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-1.5 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-blue-600 h-1.5 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Profile Information */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome Aboard!</h2>
                  <p className="text-gray-500 text-xs mb-4">Let's set up your profile for your company's eco-workspace.</p>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Full Name</label>
                  <input 
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Department</label>
                  <select 
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all text-gray-700"
                  >
                    <option value="">Select Department</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing / Sales</option>
                    <option value="hr">Human Resources</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
              </div>
            )}

            {/* Workplace Model */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Work Arrangement</h2>
                  <p className="text-gray-500 text-xs mb-4">How often do you work from the corporate office?</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'office', label: 'Full Office', desc: 'Working on-site every day' },
                    { id: 'hybrid', label: 'Hybrid Option', desc: 'Split between home and office' },
                    { id: 'remote', label: 'Fully Remote', desc: '100% working from home' },
                  ].map((mode) => (
                    <label 
                      key={mode.id}
                      className={`p-3.5 border rounded-xl flex items-start gap-3 cursor-pointer transition-all ${
                        formData.workMode === mode.id 
                          ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500' 
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100/70'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="workMode" 
                        value={mode.id}
                        checked={formData.workMode === mode.id}
                        onChange={handleInputChange}
                        className="mt-1 accent-blue-600"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{mode.label}</p>
                        <p className="text-xs text-gray-500">{mode.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Eco & Commute Metrics */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Commute Carbon Footprint</h2>
                  <p className="text-gray-500 text-xs mb-4">Help us calculate your tracking baseline impact accurately.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Primary Commute Mode</label>
                  <select 
                    name="commuteMethod"
                    value={formData.commuteMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all text-gray-700"
                  >
                    <option value="public-transit">Public Train / Bus Network</option>
                    <option value="car">Standard Petrol / Diesel Vehicle</option>
                    <option value="EV">Electric Vehicle (EV)</option>
                    <option value="bike-walk">Bicycle / Walking Active Travel</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600">Daily Est. Distance (km, round-trip)</label>
                  <input 
                    type="number"
                    name="commuteDistance"
                    value={formData.commuteDistance}
                    onChange={handleInputChange}
                    placeholder="e.g. 15"
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Navi Action Footer */}
        <div className="flex gap-3 mt-8 border-t border-gray-100 pt-4">
          {step > 1 && (
            <button 
              type="button"
              onClick={prevStep}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              Back
            </button>
          )}
          
          {step < 3 ? (
            <button 
              type="button"
              onClick={nextStep}
              disabled={step === 1 && !formData.fullName}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm text-center"
            >
              Continue
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm text-center"
            >
              Submit & Join Hub
            </button>
          )}
        </div>

      </div>
    </div>
  );
}