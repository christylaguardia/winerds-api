const admin = require('firebase-admin');

const defaultServiceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(defaultServiceAccount),
  databaseURL: `https://${process.env.FIREBASE_DATABASE_NAME}.firebaseio.com`
});

function verifyUser(req, res, next) {
  const token = req.get('Authorization') || req.get('authorization');

  if (!token) return next({ code: 401, error: 'No Authorization Found' });

  return admin.auth().verifyIdToken(token)
    .then(payload => {
      req.user = payload;
      next();
    }, err => {
      next({ code: 401, error: 'Authorization Failed', original: err });
    });
};

module.exports = verifyUser;