
const axios = require('axios');
const {login} = require('./login');
require('dotenv').config();
const {mockPixPayment} = require('./mockPixPayment')

async function generatePixQRCode(amount, referenceLabel) {
    let jwt = '';
   const jwtjson = await login(process.env.EMAIL, process.env.PASSWORD);
   jwt = jwtjson.accessToken;
    const endpoint = `/pay-in/br-code?amount=${amount}&referenceLabel=${referenceLabel}`;    
      try {
        const response = await axios.get(process.env.BRLA_URL+endpoint, {
          headers: {
            'Authorization': 'bearer ' +  jwt,
          },
        });
        console.log('Request successful:', response.data);
        if (process.env.IS_SANDBOX==="TRUE") {
            await mockPixPayment()
        }
        return response.data
      } catch (error) {
        console.error('Error:', error?.response?.data || error?.message);
      }
    }


   
    module.exports = {
        generatePixQRCode
    };

   