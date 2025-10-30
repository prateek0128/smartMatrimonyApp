import { apiClient } from "./apiUtility";
 


export const createPhonePeOrder = async (orderData: any) => {
  const client = await apiClient();
  const response = await client.post("/create-phonepe-order", orderData);
  return response;
};

export const phonePeCallback = async (callbackData: any) => {
  const client = await apiClient();
  const response = await client.post("/callbackUrl", callbackData);
  return response;
};


export const checkoutGet = async (checkoutData: any) => {
  const client = await apiClient();
  const response = await client.post("/checkout", checkoutData);
  return response;
};


export const checkoutPost = async (checkoutData: any) => {
  const client = await apiClient();
  const response = await client.post("/checkout", checkoutData);
  return response;
};


export const getSubscriptions = async () => {  // no parameterssss...
  const client = await apiClient();
  const response = await client.get("/subscriptions");
  return response;
};

export const getCoupon = async (queryParams?: any) => {   // Please confirm this before use.. this is query para..
  const client = await apiClient();
  try {
    const response = await client.get(`/coupon?queryParams=${queryParams}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const creditsInitiatePurchase = async (purchaseData: any) => {
  const client = await apiClient();
  const response = await client.post("/credits/initiate-purchase", purchaseData);
  return response;
};

export const creditsSubscriptionPlan = async () => {
  const client = await apiClient();
  const response = await client.get("/credits/subscription_plan");
  return response;
};

export const creditsPackages = async () => {
  const client = await apiClient();
  const response = await client.get("/credits/packages");
  return response;
};

export const creditsSummary = async (userId?: any) => {
  const client = await apiClient();
  const response = await client.get(`/credits/summary?userId=${userId}`);
  return response;
};

export const creditsStatus = async (userId?: any, merchantTransactionId?: any) => {
  const client = await apiClient();
  const response = await client.get(
    `/credits/status?userId=${userId}&merchantTransactionId=${merchantTransactionId}`
  );
  return response;
};

// for ios --token based
export const creditsTransactionStatus = async (token?: any) => {
  const client = await apiClient();
  const response = await client.get(`/credits/transcation-status?token=${token}`);
  return response;
};

export const creditsRequestAccess = async (accessData: any) => {
  const client = await apiClient();
  const response = await client.post("/credits/request-access", accessData);
  return response;
};


//for feature
export const creditsDeductFeature = async (deductData: any) => { 
  const client = await apiClient();
  const response = await client.post("/credits/deduct-feature", deductData);
  return response;
};

export const creditsDeduct = async (deductData: any) => {
  const client = await apiClient();
  const response = await client.post("/credits/deduct", deductData);
  return response;
};
