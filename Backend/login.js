const axios = require('axios');
async function login(email, password) {
    const endpoint = '/login';
    const body = {
        email:email,
        password: password
      };

    
      try {
    
        const response = await axios.post(process.env.BRLA_URL+endpoint, body, {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error:', error?.response?.data || error?.message);
      
       
      }
    }

    module.exports = {
        login
    };
