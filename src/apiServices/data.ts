import { apiClient } from "./apiUtility";
 

export const getCategories = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/get-categories");
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchAdvanced = async (searchBody: any, query1?: any, query2?: any) => {
  const client = await apiClient();
  try {
    const response = await client.post(`/search?query1=${query1}&query2=${query2}`, searchBody);
    return response;
  } catch (error) {
    throw error;
  }
};

export const cleanCache = async () => {
  const client = await apiClient();
  try {
    const response = await client.delete("/clean-cache");
    return response;
  } catch (error) {
    throw error;
  }
};

export const addPriorityWeightage = async (weightageData: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/add/priority-weightage", weightageData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getVersionInfo = async () => {    //is this duplicate? also available in user.ts.. for what we are gonna use this for??
  const client = await apiClient();   
  try {
    const response = await client.get("/get-version-info");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getGeneralData = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/general-data");
    return response;
  } catch (error) {
    throw error;
  }
};

export const categories = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/categories");
    return response;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (categoryData: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/create-category", categoryData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getQuestions = async () => {  //in this we get groom and bride specific questions.. which are gender specofic.. so we need to check the gender of the user and then fetch accordingly.
  const client = await apiClient();
  try {
    const response = await client.get("/questions");
    return response;
  } catch (error) {
    throw error;
  }
};

export const addAnswer = async (answerData: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/add-answer", answerData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addQuestion = async (questionData: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/add-question", questionData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const stagesPost = async (stageData: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/stages", stageData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const versionInfoGet = async (versionData: any) => { //I guess duplicate...also availabel in user.ts.. for what we are gonna use this for??
  const client = await apiClient();
  try {
    const response = await client.post("/version-info", versionData);
    return response;
  } catch (error) {
    throw error;
  }
};


export const versionInfoPost = async (versionData: any) => { //I guess duplicate...also availabel in user.ts.. for what we are gonna use this for??
  const client = await apiClient();
  try {
    const response = await client.post("/version-info", versionData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getStage = async (userId?: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/get-stage?userId=${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const feedbackPhoneGet = async (userId?: any, phone?: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/feedback-phone?userId=${userId}&phone=${phone}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const feedbackPhonePost = async (feedbackData: any, userId?: any, phone?: any) => {
  const client = await apiClient();
  try {
    const response = await client.post(`/feedback-phone?userId=${userId}&phone=${phone}`, feedbackData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCompanyInfo = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/company-info");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAboutMeSamples = async (getAboutMeSamplesDetails: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/get-about-me-samples", getAboutMeSamplesDetails);
    return response;
  } catch (error) {
    throw error;
  }
};

export const vedicMatchmaking = async (birthDetails: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/vedic-matchmaking", birthDetails);
    return response;
  } catch (error) {
    throw error;
  }
};

export const chatConsent = async (userId?: any, matchedUserId?: any) => {
  const client = await apiClient();
  try {
    const response = await client.post(`/chat-consent?userId=${userId}&matchedUserId=${matchedUserId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const interactionLikeDislike = async (interactionData: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/interaction-like-dislike", interactionData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSearchData = async () => {   //where gonna use this?? please confirm..
  const client = await apiClient();
  try {
    const response = await client.get("/get-search-data");
    return response;
  } catch (error) {
    throw error;
  }
};

export const webGet = async (webHookGet: any) => {
  const client = await apiClient();
  try {
    const response = await client.get("/web", webHookGet);
    return response;
  } catch (error) {
    throw error;
  }
};

export const webPost = async (webHookPost: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/web", webHookPost);
    return response;
  } catch (error) {
    throw error;
  }
};

export const dataCasteGet = async (casteDataGet: any) => {
  const client = await apiClient();
  try {
    const response = await client.get("/data/caste", casteDataGet);
    return response;
  } catch (error) {
    throw error;
  }
};

export const dataCastePost = async (casteDataPost: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/data/caste", casteDataPost);
    return response;
  } catch (error) {
    throw error;
  }
};

export const subscribeForSite = async (subscriptionData: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/subscribeForSite", subscriptionData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const commonServices = async (userId?: any) => {
  const client = await apiClient();
  try {
    const response = await client.post(`/common-services?userId=${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
