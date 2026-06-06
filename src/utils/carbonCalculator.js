/**
 * @param {number} dailyDistance - Jarak tempuh pulang-pergi per hari (km)
 * @param {string} method - Jenis kendaraan ('car', 'EV', 'public-transit', 'bike-walk')
 * @param {number} daysPerMonth - Rata-rata hari kerja on-site dalam sebulan
 * @returns {object} - Hasil dalam kgCO2e dan mtCO2e
 */
export const calculateCommuteEmissions = (dailyDistance, method, daysPerMonth = 20) => {
  const emissionFactors = {
    'car': 0.192,            
    'EV': 0.053,             
    'public-transit': 0.041, 
    'bike-walk': 0           
  };


  const factor = emissionFactors[method] || 0;

  const monthlyEmissionsKg = dailyDistance * daysPerMonth * factor;
  
  const monthlyEmissionsMT = monthlyEmissionsKg / 1000;

  return {
    kg: parseFloat(monthlyEmissionsKg.toFixed(2)),
    mt: parseFloat(monthlyEmissionsMT.toFixed(4))
  };
};