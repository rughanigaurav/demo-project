import { textFieldsList } from "../field-map.js";
import { cleanQuery } from "../query-functions.js";
import { infixToPostfix } from "./infixToPostfix.js";
import { postfixToInfix } from "./postfixToInfix.js";
import {
  addSpace,
  findAllOccurrencesOfFieldOperators,
  formatNumberFields,
  formatOperatorsInput,
  isBalancedParenthesis,
  isValidConversion,
  processEquations,
  removeExtraSpaces,
  removeRedundantBrackets,
  removeSpaceFieldOperators,
} from "./utils.js";
/*
This function will place the processed field expression in main expression
*/
export const processFieldGroupExpression = (input, newEquations, indices) => {
  let { equations: rawEquations } = processEquations({
    input,
    indices,
    replaceSpace: false,
  });
  rawEquations.forEach((eq, index) => {
    input = input.replace(removeExtraSpaces(eq.equation), `var-${index}`);
  });
  const postFix = infixToPostfix(input);
  let infixOutput = postfixToInfix(postFix);
  newEquations.forEach((eq, index) => {
    infixOutput = infixOutput.replace(`var-${index}`, eq.equation);
  });
  infixOutput = removeExtraSpaces(infixOutput);
  return infixOutput;
};
/*
example: SS=(a or b or d) or TI=( x or y and z)
field expression are : [SS=(a or b or d), TI=( x or y and z)]
*/
export const processFieldExpressions = (input, indices) => {
  const { equations } = processEquations({
    input,
    indices,
    replaceSpace: true,
  });
  const newEquations = [];
  equations.forEach((equation) => {
    if (textFieldsList.includes(equation.field.toUpperCase())) {
      const postfix = infixToPostfix(equation.equation);

      const infix = postfixToInfix(postfix);
      newEquations.push({
        equation: removeExtraSpaces(infix),
        field: equation.field,
      });
    } else {
      newEquations.push(equation);
    }
  });
  return newEquations;
};
// to add brackets according to precedence of operators
export const preProcess = (userQuery) => {
  userQuery = cleanQuery(userQuery);
  if (!isBalancedParenthesis(userQuery)) {
    let output = "string not balanced";
    return { success: false, output };
  }
  let input = addSpace(userQuery);

  input = removeExtraSpaces(input);
  input = formatOperatorsInput(input);
  const indices = findAllOccurrencesOfFieldOperators(input);
  const newEquations = processFieldExpressions(input, indices);

  let infixOutput = processFieldGroupExpression(input, newEquations, indices);

  const success = isValidConversion(userQuery, infixOutput);
  infixOutput = formatNumberFields(infixOutput);
  infixOutput = infixOutput.replaceAll("( ", "(").replaceAll(" )", ")");
  const reducedBrackets = removeRedundantBrackets(infixOutput);
  const output = removeSpaceFieldOperators(reducedBrackets);
  return { success, output };
};
