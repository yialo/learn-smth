import express from 'express';
import { auth } from 'express-openid-connect';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const {
  PORT = 3000,
  ISSUER_BASE_URL,
  CLIENT_ID,
  BASE_URL,
  SECRET,
} = process.env;

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,

    issuerBaseURL: ISSUER_BASE_URL,
    baseURL: BASE_URL,
    clientID: CLIENT_ID,
    secret: SECRET,
    idpLogout: true,
  }),
);

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
