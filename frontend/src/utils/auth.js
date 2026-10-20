import CryptoJS from "crypto-js";

const TOKEN_KEY = "token";
const USER_KEY = "user";
const SECRET = import.meta.env.VITE_STORAGE_SECRET;

// Encrypt a value before saving it in localStorage
const encrypt = (value) => CryptoJS.AES.encrypt(value, SECRET).toString();

// Decrypt a saved value, returns null if it is missing or broken
const decrypt = (cipher) => {
  try {
    const text = CryptoJS.AES.decrypt(cipher, SECRET).toString(
      CryptoJS.enc.Utf8,
    );
    return text || null;
  } catch {
    return null;
  }
};

// Save the token and user (both encrypted) after login
export const saveAuth = (token, user) => {
  localStorage.setItem(TOKEN_KEY, encrypt(token));
  localStorage.setItem(USER_KEY, encrypt(JSON.stringify(user)));
};

// Get the real token (used by the axios interceptor)
export const getToken = () => {
  const cipher = localStorage.getItem(TOKEN_KEY);
  return cipher ? decrypt(cipher) : null;
};

// Get the saved user object (used by the header)
export const getUser = () => {
  const cipher = localStorage.getItem(USER_KEY);
  const text = cipher ? decrypt(cipher) : null;
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
};

// Check that a token exists and has not expired
export const isValidToken = () => {
  const token = getToken();
  if (!token) return false;

  try {
    // The middle part of a JWT is the payload (base64url encoded JSON)
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    // exp is in seconds, Date.now() is in milliseconds
    return payload.exp * 1000 > Date.now();
  } catch {
    // Broken or fake token
    return false;
  }
};

// Remove all saved login data
export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
