export const clearFielded = (fieldData) => {
  return fieldData.map((item) => {
    return {
      ...item,
      filedsinput: "",
      startdate: "",
      enddate: "",
      error: "",
      fielderror: "",
      dateerror: ""
    };
  });
};
