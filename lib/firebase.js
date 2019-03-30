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
  const idToken = req.get('Authorization') || req.get('authorization');

  if (!idToken) return next({ code: 401, error: 'No Authorization Found' });

  // TODO: verify this is working when token expires
  admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      next();
    }).catch(error => {
      next({ code: 401, error }); // authorization failed
    });
};

module.exports = verifyUser;
