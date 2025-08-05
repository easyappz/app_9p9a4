import instance from './axios';

// Save a new calculation
export const saveCalculation = async (calculationData) => {
  const response = await instance.post('/api/calculations', calculationData);
  return response.data;
};

// Get calculation history
export const getCalculationHistory = async () => {
  const response = await instance.get('/api/calculations');
  return response.data;
};
