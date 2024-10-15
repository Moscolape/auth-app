import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.firebaseApiKey;

async function authenticate(mode, email, password) {
  if (!API_KEY) {
    throw new Error('Firebase API key is missing');
  }

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
