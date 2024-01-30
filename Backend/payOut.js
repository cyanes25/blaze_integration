const axios = require('axios');
const {login} = require('./login');
require('dotenv').config();

async function generatePayOut(pixKey, taxId, amount) {
    let jwt = '';
   const jwtjson = await login(process.env.EMAIL, process.env.PASSWORD);
   jwt = jwtjson.accessToken;
    const endpoint = `/pay-out`;
    const body = {
        pixKey:pixKey,
        taxId:taxId,
        amount: amount
      };    
      try {
        const response = await axios.post(process.env.BRLA_URL+endpoint, body, {
          headers: {
            'Authorization': 'bearer ' +  jwt,
          },
        });
        console.log('Request successful:', response.data);
        return response.data
      } catch (error) {
        console.error('Error:', error?.response?.data || error?.message);
      }
    }


    module.exports = {
        generatePayOut
    };