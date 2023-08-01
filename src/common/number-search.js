export const getFinalSearchString = (searchString) => {
  let stringData = [];
  let finalString = searchString.split("=(");
  let fields = finalString[0] && finalString[0].split(" ");
  fields &&
    fields.forEach((item) => {
      if (item.toLowerCase() === "or") {
        return "";
      } else {
        stringData.push(`${item}=(${finalString[1]}`);
      }
    });
  return [...stringData];
};

export const getFileContent = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
};

export const getShortCode = (checkFields) => {
  let temp = [];
  if (checkFields.includes("PN")) {
    temp.push("PN");
  }
  if (checkFields.includes("AN")) {
    temp.push("AN");
  }
  if (checkFields.includes("PRN")) {
    temp.push("PRN");
  }
  let checkedFieldsString = temp ? temp.join("") : "";
  const fields = {
    PNANPRN: "PAPR",
    PNAN: "PA",
    PNPRN: "PPR",
    ANPRN: "APR",
    PN: "PN",
    AN: "AN",
    PRN: "PRN",
  };

  return fields[checkedFieldsString] || "PN";
};

export const getCheckFields = (checkedFieldsString) => {
  const fields = {
    PAPR: ["PN", "AN", "PRN"],
    PA: ["PN", "AN"],
    PPR: ["PN", "PRN"],
    APR: ["AN", "PRN"],
    PN: ["PN"],
    AN: ["AN"],
    PRN: ["PRN"],
  };

  return fields[checkedFieldsString] || ["PN"];
};
