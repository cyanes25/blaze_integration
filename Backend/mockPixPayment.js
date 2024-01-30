
const axios = require('axios');
const {login} = require('./login');
require('dotenv').config();

async function mockPixPayment() {
    let jwt = '';
   const jwtjson = await login(process.env.EMAIL, process.env.PASSWORD);
   jwt = jwtjson.accessToken;
   console.log("jwt: ", jwt)
    const endpoint = `/mock-pix-pay-in`;   
      try {
        const response = await axios.post(process.env.BRLA_URL + endpoint, {}, {
            headers: {
              'Authorization': 'Bearer ' + jwt,
            },
          });
          
        console.log('Request successful:', response.data);
        return response.data
      } catch (error) {
        console.error('Error:', error?.response?.data || error?.message);
      }
    }


    
    module.exports = {
        mockPixPayment
    };

   