export const Message = {
  // HEADER DATA
  RWIRE_USER_NAME: "Hi, UserName",
  RWIRE_SEARCH: "Search",
  RWIRE_HISTORY: "History",
  RWIRE_PATENT_RESULT: "Patents Result",
  RWIRE_LANGUAGE: "English",
  RWIRE_SMART_SEARCH: "Smart Search",
  RWIRE_FIELDED: "Fielded",
  RWIRE_EXPERT: "Expert",
  RWIRE_NUMBER: "Number",
  RWIRE_STATUS: "Status:",
  RWIRE_STATE: "State:",
  RWIRE_TYPE: "Type:",
  RWIRE_PUB: "Pub:",
  RWIRE_QUERY: "Query",
  RWIRE_FIEDS: "Fields",
};

//Export max record count
export const maxExportRecordsCount = 3000;

export const s3ClipImageurl =
  "https://rwire-clip-images.s3.ap-south-1.amazonaws.com/";
//Elastic data url
export const url = `/data/rwire-patent-v2`;
export const classesSearchUrl = `/data/rwire-classes`;
export const resources_url = "/resources-api";
export const image_api_url = `${resources_url}/images`;
export const pdf_api_url = `${resources_url}/pdf`;
//Api url
export const api_url = "";
// export const elastic_api_url = "https://analytics.researchwire.in/parser-api/";
export const elastic_api_url = "/parser-api/";
export const smart_search = "search";
export const aggregation_data_number_search = "with-includes-number-search";
export const patent_detials = "patent-details";
export const filters_options = "filters-options";
export const count = "count";
export const chart_data = "chart-data";
export const chart_filters_options = "chart-filters-options";
export const classes_suggestor = "classes-suggestor";
export const method = "post";
export const headers = {
  ...{ Accept: "application/json", "Content-Type": "application/x-ndjson" },
};

//In active user alert popup time
export const inActiveScreenTime = 7200000; //It is in ms, 2h

//After alert popup auto logout user time
export const inActiveAutoLogoutTime = 300000; //It is in ms, 5m

export const MAX_EXPIRE_DATE = "2050-12-31";
