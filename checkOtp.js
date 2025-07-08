const axios = require('axios');

async function fetchOtp(number) {
  try {
    const url = `https://www.ivasms.com/api/smsbox?number=${number}`;
    const { data } = await axios.get(url);

    if (data?.data && data.data.length > 0) {
      const msg = data.data[0];

      return {
        number,
        time: msg.date || 'Unknown',
        service: 'FACEBOOK',
        otp: msg.otp || 'Not Found',
        message: msg.sms || 'No Message'
      };
    }

    return null;

  } catch (err) {
    // ❌ Suppress 404 errors only
    if (err.response?.status !== 404) {
      console.error(`❌ OTP fetch failed for ${number}:`, err.message);
    }
    return null;
  }
}

module.exports = fetchOtp;
