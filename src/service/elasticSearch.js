import axios from "axios";
import { elastic_api_url } from "../components/constant";

//this function makes an api call to given url and return image urls
export const getResourcesURL = async (body, api_url) => {
  const configRequest = {
    method: "post",
    url: api_url,
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    // responseType:"stream",
    data: body,
  };
  return await axios.request(configRequest);
};

//this function makes an api call to given url and return response data
export const search = async (body, api_url) => {
  const configRequest = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${elastic_api_url + api_url}`,
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    // responseType:"stream",
    data: body,
  };
  return await axios.request(configRequest);
};
