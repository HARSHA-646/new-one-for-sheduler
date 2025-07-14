const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsApp = async (type, time) => {
  const message = `📌 Reminder: It's time for your ${type} session at ${time}.\nPlease reply YES/NO once you're done.`;

  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.TWILIO_WHATSAPP_TO,
      body: message
    });
    console.log(`✅ WhatsApp message sent: ${type} @ ${time}`);
  } catch (err) {
    console.error('❌ Failed to send WhatsApp message:', err.message);
  }
};

module.exports = {
  sendWhatsApp
};
