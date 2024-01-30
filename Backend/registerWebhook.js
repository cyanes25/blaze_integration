const {ApiUrl} = require('../Frontend/blaze-frontend/src/utils');
const axios = require('axios');
const {login} = require('./login');
require('dotenv').config();

async function registerWebhook(link) {
    let jwt = '';
   const jwtjson = await login(process.env.EMAIL, process.env.PASSWORD);
   jwt = jwtjson.accessToken;
    const endpoint = '/webhooks';
    const body = {
        url:link
      };    
      try {
        const response = await axios.post(ApiUrl+endpoint, body, {
          headers: {
            'Authorization': 'bearer ' +  jwt,
          },
        });
        console.log('Request successful:', response.data);
      } catch (error) {
        console.error('Error:', error?.response?.data || error?.message);
      }
    }

    registerWebhook('https://59f0-191-209-21-128.ngrok-free.app')