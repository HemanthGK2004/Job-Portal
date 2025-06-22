import axios from 'axios';

export const getCompanyDashboardData = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) throw new Error('No token found');

    const response = await axios.get('/api/company/dashboard-overview', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data; // Return the data from the API
};
