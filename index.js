require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fetchOtp = require('./checkOtp');
const numbers = require('./numbers.json').numbers; // ✅ এই লাইন ঠিক করলাম

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const sentOtps = {}; // OTP prevent duplicate send

async function checkAllNumbers() {
  for (const number of numbers) {
    const otpData = await fetchOtp(number);

    if (otpData && otpData.otp && sentOtps[number] !== otpData.otp) {
      const msg = `🔔 *𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 OTP Received Successfully*\n\n` +
                  `🕒 *Time:* ${otpData.time}\n` +
                  `⚙️ *Service:* ${otpData.service}\n` +
                  `📞 *Number:* ${otpData.number}\n` +
                  `🔑 *Your OTP:* \`${otpData.otp}\`\n\n` +
                  `💌 *Full Message:* ${otpData.message}\n\n` +
                  `📖 حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ — *Allah is sufficient for us, and He is the best disposer.* (3:173)\n\n` +
                  `🚀 *Be Active  New OTP Coming*`;

      bot.sendMessage(process.env.GROUP_ID, msg, { parse_mode: 'Markdown' });
      sentOtps[number] = otpData.otp;
    }
  }
}

// ⏱️ Check every 10 seconds
setInterval(checkAllNumbers, 10000);

console.log('✅ IVASMS OTP Bot running...');
