import fetch from "unfetch";
import { url, classesSearchUrl } from "../components/constant";

const headers = {
  ...{ Accept: "application/json", "Content-Type": "application/x-ndjson" },
};

export const search = async (body, method = "POST") => {
  const rawResponse = await fetch(`${url}/_search`, { method, headers, body });
  return rawResponse.json();
};

export const searchScroll = async (body, method = "POST", scrollId) => {
  const scrollPost = scrollId ? "_search/scroll" : "_search?scroll=10m";

  const rawResponse = await fetch(
    `${url.replace(`/${url.split("/").pop()}`, "")}/${scrollPost}`,
    { method, headers, body }
  );
  return rawResponse.json();
};

export const count = async (body, method = "POST") => {
  const rawResponse = await fetch(`${url}/_count`, { method, headers, body });
  return rawResponse.json();
};

export const classesSearch = async (body, method = "POST") => {
  const rawResponse = await fetch(`${classesSearchUrl}/_search`, { method, headers, body });
  return rawResponse.json();
};
