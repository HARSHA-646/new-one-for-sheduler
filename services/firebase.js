const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();

const logResponse = async (type, response) => {
  const logRef = db.collection('task_logs').doc();
  await logRef.set({
    type,
    response,
    timestamp: new Date().toISOString()
  });
};

const setUnavailable = async (days) => {
  const unavailableRef = db.collection('status').doc('unavailable');
  const until = new Date();
  until.setDate(until.getDate() + days);
  await unavailableRef.set({ until: until.toISOString() });
};

const checkUnavailable = async () => {
  const snap = await db.collection('status').doc('unavailable').get();
  if (!snap.exists) return false;
  const data = snap.data();
  const now = new Date();
  const until = new Date(data.until);
  return now <= until;
};

const updateStreak = async () => {
  const streakRef = db.collection('streak').doc('counter');
  const snap = await streakRef.get();
  if (snap.exists) {
    const count = snap.data().count || 0;
    await streakRef.set({ count: count + 1 });
  } else {
    await streakRef.set({ count: 1 });
  }
};

module.exports = {
  logResponse,
  setUnavailable,
  checkUnavailable,
  updateStreak
};
