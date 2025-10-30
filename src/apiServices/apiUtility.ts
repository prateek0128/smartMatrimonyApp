// src/api/apiClient.js
import axios from "axios";
import { storage } from "../utils/storage";

const baseURL = "https://smartmatrimony.ai/api/"; //production
//const baseURL = "https://api.smartmaheshwari.com/"; //staging


const apiUrl = `${baseURL}/api/v1`;

export const apiClient = async () => {
  const token = await storage.getItem("authToken");
  return axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
