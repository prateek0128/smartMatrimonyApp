import { apiClient } from "./apiUtility";
 


export const allProperties = async (userId?: any, matchedUserId?: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/matchmaking-results/all-properties?userId=${userId}&matchedUserId=${matchedUserId}`);
    return response;
  } catch (error) {
    throw error;
  }
};



export const matchmakingResults = async (userId?: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/matchmaking-results?userId=${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const matchmakingRequest = async (matchmakingRequestData: any) => {
  const client = await apiClient();
  const response = await client.post("/matchmaking/request", matchmakingRequestData);
  return response;
};

export const downloadBiodata = async (matrimonialId?: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/download-bio-data?matrimonialId=${matrimonialId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

