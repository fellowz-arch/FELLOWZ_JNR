import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ---- AUTH ----
export const loginUser = (data) => API.post("/user/login", data);
export const registerUser = (data) => API.post("/user/register", data);
export const getProfile = () => API.get("/user/profile");

// ---- WALLET ----
export const getWalletBalance = () => API.get("/wallet");
export const addToWallet = (amount) => API.post("/wallet/add", { amount });
export const withdrawFromWallet = (amount) => API.post("/wallet/withdraw", { amount });

// ---- TRADING ----
export const placeTrade = (data) => API.post("/trade/place", data);
export const getOpenTrades = () => API.get("/trade/open");
export const getTradeHistory = () => API.get("/trade/history");

// ---- M-PESA ----
export const depositWithMpesa = (data) => API.post("/mpesa/stk", data);
export const withdrawMpesa = (data) => API.post("/mpesa/withdraw", data);
