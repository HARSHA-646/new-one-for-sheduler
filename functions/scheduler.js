const { sendWhatsApp } = require('../services/whatsapp');
const {
  logResponse,
  checkUnavailable,
  updateStreak
} = require('../services/firebase');

const sendEveningReminders = async (type = 'DSA', time = '6:00 PM') => {
  const isUnavailable = await checkUnavailable();
  if (isUnavailable) {
    console.log('🚫 User marked unavailable. Skipping reminder.');
    return;
  }

  console.log(`📢 Sending WhatsApp message for ${type} at ${time}`);
  await sendWhatsApp(type, time);
};

const handleUserResponse = async (type, response) => {
  if (!['YES', 'NO', 'Done'].includes(response.toUpperCase())) {
    console.log('❌ Invalid response:', response);
    return;
  }

  await logResponse(type, response.toUpperCase());

  if (['YES', 'Done'].includes(response.toUpperCase())) {
    await updateStreak();
    console.log('🔥 Streak updated!');
  }
};

module.exports = {
  sendEveningReminders,
  handleUserResponse
};
