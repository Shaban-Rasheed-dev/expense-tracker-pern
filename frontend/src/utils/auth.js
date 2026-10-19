// Check that a token exists and has not expired
export const isValidToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  // try {
  //   // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  //   // .
  //   // eyJpZCI6NSwiZW1haWwiOiJzaGFiYW4xQGdtYWlsLmNvbSIsImlhdCI6MTc5MjQxMDkzNiwiZXhwIjoxNzkzMDE1NzM2fQ
  //   // .
  //   // XTT-JgTx9SmzP_DuFCz_XfwZYORau_wvpMD5tFuIntM
  //   // The middle part of a JWT is the payload (base64url encoded JSON)
  //   const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  //   console.log(base64);

  //   const payload = JSON.parse(atob(base64));
  //   console.log(payload);
  //   // exp is in seconds, Date.now() is in milliseconds
  //   return payload.exp * 1000 > Date.now();
  // } catch {
  //   // Broken or fake token
  //   return false;
  // }
};

// Remove all saved login data
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
