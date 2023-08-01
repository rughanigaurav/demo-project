import {
  addSpace,
  findAllOccurrencesOfFieldOperators,
  formatOperatorsInput,
  isBalancedParenthesis,
  processEquations,
  removeExtraSpaces,
  removeSpaceFieldOperators,
} from "./pre-process-input/utils";
import { cleanQuery } from "./query-functions";

export const replaceSpace = (str) => {
  let userQuery = cleanQuery(str);
  userQuery = removeExtraSpaces(userQuery);
  if (!isBalancedParenthesis(userQuery)) {
    throw new Error("Please check the brackets.");
  }
  let input = addSpace(userQuery);

  input = removeExtraSpaces(input);

  input = formatOperatorsInput(input);
  const indices = findAllOccurrencesOfFieldOperators(input);
  const { equations: rawEquations } = processEquations({
    input,
    indices,
    replaceSpace: false,
  });
  const { equations: newEquations } = processEquations({
    input,
    indices,
    replaceSpace: true,
  });
  rawEquations.forEach((eq, index) => {
    input = input.replace(
      removeExtraSpaces(eq.equation),
      newEquations[index].equation
    );
  });
  input = removeExtraSpaces(input);
  const output = removeSpaceFieldOperators(
    input.replaceAll("( ", "(").replaceAll(" )", ")")
  );
  return output;
};
