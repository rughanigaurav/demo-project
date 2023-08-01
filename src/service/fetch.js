import axios from "axios";
import { api_url } from "../components/constant";

export const call = (method = "POST", param, headers) => axios({
  url: `${api_url}${param.url}`,
  method,
  headers,
  data: JSON.stringify(param.body)
}).catch(error => {
  const errorMessage = error.response.data.message;

  if (errorMessage && (errorMessage.includes("Expired") || errorMessage === "JWT Token not found")) {
    if(errorMessage.includes("Expired")) {
      sessionStorage.setItem("expired", "true");
    }
    // logout user when token expired
    sessionStorage.removeItem("token");
    return window.location.href = "/";
  }

  throw new Error(errorMessage);
}).then(({ data }) => data);

export const fetch = (param, method) => {
  const token = sessionStorage.getItem('token');

  let headers = {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  };

  if(token) {
    headers = {...headers, "Authorization": `Bearer ${token}`};
  }


  return call(method, param, headers);
}
