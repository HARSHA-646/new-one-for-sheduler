const express = require('express');
const cron = require('node-cron');
require('dotenv').config();

const { sendEveningReminders } = require('./functions/scheduler');





const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Harsha Smart Tracker Backend is Live!');
});


cron.schedule('0 18 * * *', async () => {
  console.log('🧠 Sending DSA reminder at 6:00 PM...');
  await sendEveningReminders('DSA', '6:00 PM');
});

cron.schedule('0 19 * * *', async () => {
  console.log('🤖 Sending ML reminder at 7:00 PM...');
  await sendEveningReminders('ML', '7:00 PM');
});

cron.schedule('0 10 * * 6,0', async () => {
  console.log('🎯 Weekend Reminder (Aptitude/Placement) at 10:00 AM...');
  await sendEveningReminders('Placement', '10:00 AM');
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
