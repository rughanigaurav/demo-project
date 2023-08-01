import moment from "moment";
import { MAX_EXPIRE_DATE } from "../components/constant";
export const yearFields = ["AY", "EPRY", "PRY", "PY"];

export const checkValidation = async ({ startDate, endDate, data, index }) => {
  const startDateValidation = startDate ? moment(startDate).format("YYYYMMDD") : "";
  const endDateValidation = endDate ?  moment(endDate).format("YYYYMMDD") : "";
  const startValidation =
    startDateValidation === "Invalid date" ? "" : startDateValidation;
  const endValidation =
    endDateValidation === "Invalid date" ? "" : endDateValidation;
  data.forEach((element, key) => {
    if (key === index) {
      if (!startValidation && endValidation && element.query === "") {
        element.fielderror = "Please select date field";
      } else if (
        startValidation &&
        endValidation === "" &&
        element.query === ""
      ) {
        element.fielderror = "Please select date field";
      } else {
        element.fielderror = "";
      }

      if (startValidation !== "" && endValidation !== "") {
        if (startValidation > endValidation && element.query === "") {
          element.fielderror = "Please select date field and valid date";
        } else if (startValidation > endValidation && element.query) {
          element.fielderror = "Please select valid date"
        } else if (startValidation < endValidation && element.query === "") {
          element.fielderror = "Please select date field";
        } else if (startValidation === endValidation && element.query === "") {
          element.fielderror = "Please select date field and valid date";
        } else if (startValidation === endValidation && element.query) {
          element.fielderror = "Please select valid date";
        } else {
          element.fielderror = "";
        }
      }
    }
  });
  return data;
};

export const getDateFiedsOptions = (queryValue) => {
  let maxDate = new Date();
  let isExpiryDate = false;
  if (queryValue && queryValue.toLowerCase() === "ed") {
    maxDate = new Date(MAX_EXPIRE_DATE);
    isExpiryDate = true;
  }

  if (yearFields.includes(queryValue)) {
    return {
      maxDate,
      placeholder: "YYYY",
      dateFormat: "yyyy",
      showYearPicker: true,
      isExpiryDate
    }
  } else {
    return {
      maxDate,
      placeholder: "YYYY-MM-DD",
      dateFormat: "yyyy-MM-dd",
      showYearPicker: false,
      isExpiryDate
    }
  }
}
