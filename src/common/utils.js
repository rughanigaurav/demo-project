import { fieldTypeChecking } from "../resources/data/mapping";

export const checkFieldTypeKeywordBase = (field) => {
  return (
    fieldTypeChecking[field] &&
    (fieldTypeChecking[field].type === "keyword" ||
      fieldTypeChecking[field].type === "integer" ||
      fieldTypeChecking[field].type === "date")
  );
};

export const checkFieldTypeDateBase = (field) => {
  return (
    fieldTypeChecking[field].type === "integer" ||
    fieldTypeChecking[field].type === "date"
  );
};

export const filterOptions = [
  { value: "ASD", label: "Standardized Assignee Name" },
  { value: "IN_EN", label: "Inventor Name" },
  { value: "IPC", label: "IPC" },
  { value: "CPC", label: "CPC" },
  { value: "USM", label: "US Class" },
  { value: "PRC", label: "Priority Country" },
  { value: "PNC", label: "Publication Country" },
  { value: "ED", label: "Lapse Year" },
  { value: "PY", label: "Publication Year" },
  { value: "PRY", label: "Priority Year" },
  { value: "AG_EN", label: "Agent Name" },
  { value: "AY", label: "Application Year" },
];

export const getFilteredOptions = ({
  filterOptions,
  fieldData,
  filedIndex,
}) => {
  let fieldOptions = filterOptions.filter((i) => {
    return fieldData[filedIndex].textLabel !== Object.keys(i)[0];
  });
  const fieldValue = filterOptions.filter((i) => {
    return fieldData[filedIndex].textLabel === Object.keys(i)[0];
  });
  fieldOptions.unshift(...fieldValue);
  return fieldOptions;
};

export const fieldDropDown = {
  state: {
    selectValue: [
      {
        value: "",
        label: "SELECT",
      },
      {
        value: "ALIVE",
        label: "ALIVE",
      },
      {
        value: "DEAD",
        label: "DEAD",
      },
    ],
  },
  status: {
    selectValue: [
      {
        value: "",
        label: "SELECT",
      },
      {
        value: "FILED",
        label: "FILED",
      },
      {
        value: "GRANTED",
        label: "GRANTED",
      },
      {
        value: "CEASED",
        label: "CEASED",
      },
    ],
  },
  type: {
    selectValue: [
      {
        value: "",
        label: "SELECT",
      },
      {
        value: "UTILITY",
        label: "UTILITY",
      },
      {
        value: "DESIGN",
        label: "DESIGN",
      },
      {
        value: "PLANT",
        label: "PLANT",
      },
    ],
  },
  pub: {
    selectValue: [
      {
        value: "",
        label: "SELECT",
      },
      {
        value: "APPLICATION",
        label: "APPLICATION",
      },
      {
        value: "GRANT",
        label: "GRANT",
      },
    ],
  },
};

export const getOptions = (type) => {
  return fieldDropDown[type].selectValue;
};

export const getBottomBorder = (parentClass = "", selector = "") => {
  const parentDiv = document.querySelector(parentClass);
  const textarea = document.getElementById(selector);
  const parentPadding =
    parseInt(window.getComputedStyle(parentDiv).paddingTop) +
    parseInt(window.getComputedStyle(parentDiv).paddingBottom);
  const parentHeight = parentDiv.offsetHeight - parentPadding;

  if (textarea.offsetHeight > parentHeight) {
    textarea.style.border = "1px solid #aeaeae";
    textarea.style.borderTop = "none";
  } else {
    textarea.style.border = "none";
  }
};

export const getFontSizes = () => {
  const width = window.innerWidth;

  if (width <= 1599) {
    return [10, 14];
  } else if (width <= 1920) {
    return [14, 18];
  } else {
    return [16, 20];
  }
};
export const getPubNoFontSizes = () => {
  const width = window.innerWidth;

  if (width <= 1599) {
    return [12, 16];
  } else if (width <= 1920) {
    return [16, 20];
  } else {
    return [18, 22];
  }
};

export const getPatentInfoFontSizes = () => {
  const width = window.innerWidth;
  if (width <= 1599) {
    return [10, 12];
  } else if (width <= 1920) {
    return [13, 15];
  } else {
    return [15, 17];
  }
};

export const setDefaultFontSize = (
  textFieldsFontSize = 0,
  PubNoFontSize = 0,
  infoFieldsFontSize = 0
) => {
  const dynamicHeightElements = document.querySelectorAll(".dynamic-height");
  const dynamicHeightPubNo = document.querySelectorAll(".dynamic-height-pubNo");
  const detailsElements = document.querySelectorAll(".result-page-details");
  const detailsHeaderElements = document.querySelectorAll(
    ".details-header-result"
  );
  dynamicHeightElements.forEach((element) => {
    element.style.fontSize = `${
      textFieldsFontSize > 0 ? textFieldsFontSize : getFontSizes()[0]
    }px`;
  });
  dynamicHeightPubNo.forEach((element) => {
    element.style.fontSize = `${
      PubNoFontSize > 0 ? PubNoFontSize : getPubNoFontSizes()[0]
    }px`;
  });
  detailsElements.forEach((element) => {
    element.style.fontSize = `${
      infoFieldsFontSize > 0 ? infoFieldsFontSize : getPatentInfoFontSizes()[0]
    }px`;
  });
  detailsHeaderElements.forEach((element) => {
    element.style.fontSize = `${
      infoFieldsFontSize > 0 ? infoFieldsFontSize : getPatentInfoFontSizes()[0]
    }px`;
  });
};

export const assignTopToModal = () => {
  const sideListFixed = document.querySelector(".side-list-fixed");
  const filterModalFixedList = document.querySelectorAll(".filter-modal-fixed");
  if (sideListFixed && filterModalFixedList) {
    const topPosition = sideListFixed.getBoundingClientRect().top;

    // eslint-disable-next-line array-callback-return
    filterModalFixedList.forEach((filterModalFixed) => {
      filterModalFixed.style.top = `${topPosition}px`;
    });
  }
};

export function throttle(callback, delay) {
  let timerId;
  return function (...args) {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.apply(this, args);
      timerId = null;
    }, delay);
  };
}

export function handleMouseDown(e, handle, imageWidth, handleResizeImage) {
  e.preventDefault();
  const startX = e.clientX;
  const currentWidth = parseFloat(imageWidth);
  document.body.style.cursor = "col-resize";

  const onMouseMove = throttle((e) => {
    const newWidth = Math.max(
      currentWidth +
        (((startX - e.clientX) * handle) / window.innerWidth) * 100,
      40
    );
    handleResizeImage(newWidth + "%");
  }, 5);

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "auto";
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

export function handleTouchStart(e, handle, imageWidth, handleResizeImage) {
  e.preventDefault();
  const touch = e.touches[0];
  const startX = touch.clientX;
  const currentWidth = parseFloat(imageWidth);

  const onTouchMove = throttle((e) => {
    const touch = e.touches[0];
    const newWidth = Math.max(
      currentWidth +
        (((startX - touch.clientX) * handle) / window.innerWidth) * 100,
      40
    );
    handleResizeImage(newWidth + "%");
  }, 5);

  const onTouchEnd = () => {
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    document.body.style.cursor = "auto";
  };

  window.addEventListener("touchmove", onTouchMove);
  window.addEventListener("touchend", onTouchEnd);
}
