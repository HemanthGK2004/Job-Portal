// src/utils/api.js
import axios from 'axios';

export const getCompanyDashboardData = async (companyId) => {
  const token = localStorage.getItem('token');

  const response = await axios.get(
    `/api/company/${companyId}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
