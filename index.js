require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fetchOtp = require('./checkOtp');
const numbers = require('./numbers.json').numbers; // ✅ Ensure it's an array

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const sentOtps = {}; // Prevent duplicate OTP sends

async function checkAllNumbers() {
  for (const number of numbers) {
    const otpData = await fetchOtp(number);

    if (otpData && otpData.otp && sentOtps[number] !== otpData.otp) {
      const msg = `🔔 Facebook OTP Received Successfully

Time: ${otpData.time}
Service: ${otpData.service}
Number: ${otpData.number}
OTP: ${otpData.otp}

Full Message: ${otpData.message}

Note: Allah is sufficient for us, and He is the best disposer. (3:173)

More OTPs coming soon...`;

      bot.sendMessage(process.env.GROUP_ID, msg); // ✅ Normal message, no parse_mode
      sentOtps[number] = otpData.otp;
    }
  }
}

// ⏱️ Check every 10 seconds
setInterval(checkAllNumbers, 10000);

console.log('✅ IVASMS OTP Bot running...');


// ✅ Port setup for Render to keep the bot alive
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('✅ OTP Bot is Live');
});

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
