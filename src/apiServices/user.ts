import { apiClient } from "./apiUtility";

export const versionGetInfo = async (versionInfoData: any) => {
  const client = await apiClient();
  const response = await client.get("/version", versionInfoData);
  return response;
};

export const versionPostInfo = async (versionInfoData: any) => {
  const client = await apiClient();
  const response = await client.post("/version", versionInfoData);
  return response;
};

export const platformGetInfo = async (platformInfoData: any) => {
  const client = await apiClient();
  const response = await client.get("/platform", platformInfoData);
  return response;
};

export const platformPostInfo = async (platformInfoData: any) => {
  const client = await apiClient();
  const response = await client.post("/platform", platformInfoData);
  return response;
};

export const login = async (loginData: any) => {
  const client = await apiClient();
  const response = await client.post("/login", loginData);
  return response;
};

export const usersLogin = async (loginData: any) => {
  const client = await apiClient();
  const response = await client.post("/users/login", loginData);
  return response;
};

export const requestOtp = async (requestOtpData: any) => {
  const client = await apiClient();
  const response = await client.post("/request-otp", requestOtpData);
  return response;
};

export const register = async (registerData: any) => {
  const client = await apiClient();
  const response = await client.post("/register", registerData);
  return response;
};

export const userDetails = async (
  userId?: any,
  profile?: any,
  preference?: any
) => {
  const client = await apiClient();
  try {
    const response = await client.get(
      `/user-details?profile=${profile}&preference=${preference}&userId=${userId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addPhone = async (addPhoneData: any) => {
  const client = await apiClient();
  const response = await client.delete("/add-phone", addPhoneData);
  return response;
};

export const fetchGetContacts = async (fetchContactsData: any) => {
  const client = await apiClient();
  const response = await client.get("/fetch_contacts", fetchContactsData);
  return response;
};

export const fetchPostContacts = async (fetchContactsData: any) => {
  const client = await apiClient();
  const response = await client.post("/fetch_contacts", fetchContactsData);
  return response;
};

export const uploadBiodata = async (uploadBiodataData: any) => {
  const client = await apiClient();
  const response = await client.post("/upload-biodata", uploadBiodataData);
  return response;
};

export const submitFeedback = async (submitFeedbackaData: any) => {
  const client = await apiClient();
  const response = await client.post("/submit-feedback", submitFeedbackaData);
  return response;
};

export const blockUser = async (blockUserData: any) => {
  const client = await apiClient();
  const response = await client.post("/block-user", blockUserData);
  return response;
};

export const getManglikFeature = async (getManglikFeatureData: any) => {
  const client = await apiClient();
  const response = await client.post(
    "/user/get-manglik-feature",
    getManglikFeatureData
  );
  return response;
};

export const deleteAccount = async (userId?: any) => {
  const client = await apiClient();
  try {
    const response = await client.delete(`/delete-user?userId=${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const disableAccount = async (userId?: any) => {
  const client = await apiClient();
  try {
    const response = await client.delete(`/disable-user?userId=${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
