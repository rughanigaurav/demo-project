import { checkFieldTypeDateBase } from "../common/utils";

export const range = (start, stop, step = 1) => {

  let a = [start], b = start;

  while (b < stop) {
      a.push(b += step || 1);
  }

  return a;
}

export const filterSearchAggInclude = (filterName, value) => {
  let filterSearchAggText = "";
  let firstYearFromInput = "";
  let lastYearFromInput = "";
  const currentYear = new Date().getFullYear();
  
  if(checkFieldTypeDateBase(filterName)) {
    firstYearFromInput = value.padEnd(4, "0");
    lastYearFromInput = value.padEnd(4, "9");

    if(firstYearFromInput < 1950) {
      firstYearFromInput = 1950;
    }

    if(lastYearFromInput > currentYear ) {
      lastYearFromInput = currentYear;
    }

    const arrayOfYears = range(parseInt(firstYearFromInput), parseInt(lastYearFromInput));

    filterSearchAggText = arrayOfYears;
  } else {

    let charArray = [...value];
    let newCharArray = [];

    // eslint-disable-next-line array-callback-return
    charArray.map((i) => {
      if(i.codePointAt() >= 97 && i.codePointAt() <= 122) {
        newCharArray.push(`[${i}${i.toLocaleUpperCase()}]`);
      } else if (i.codePointAt() >= 65 && i.codePointAt() <= 90) {
        newCharArray.push(`[${i.toLocaleLowerCase()}${i}]`);
      } else {
        newCharArray.push(i);
      }
    })

    filterSearchAggText = `.*${newCharArray.join("")}.*`;
  }

  return filterSearchAggText;
}
