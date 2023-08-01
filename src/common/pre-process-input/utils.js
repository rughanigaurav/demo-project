import { numberFieldsList, textFieldsList } from "../field-map.js";
import { checkNumberValidation } from "../generate-rec-query.js";
import { fieldOperators, operators, specialOperators } from "./constant.js";
import { processFieldExpressions } from "./process.js";

// format near and adj operator
// example: NEAR10 -> NEAR, ADJ5 -> ADJ
export const formatOperator = (input) => {
  if (input.includes('"')) return input;
  const ADJ_REGEX = new RegExp(`\\bADJ[0-9]*\\b`, "gi");
  const NEAR_REGEX = new RegExp(`\\bNEAR[0-9]*\\b`, "gi");
  if (ADJ_REGEX.test(input)) {
    return "ADJ";
  } else if (NEAR_REGEX.test(input)) {
    return "NEAR";
  } else {
    return input;
  }
};
// Function to check if a word is an operator
export const isOperator = (word) => {
  word = formatOperator(word);
  return operators.hasOwnProperty(word);
};
// Function to get the precedence of an operator
export const getPrecedence = (operator) => {
  operator = formatOperator(operator);
  return operators[operator].precedence;
};
// Function to get the associativity of an operator
export const getAssociativity = (operator) => {
  operator = formatOperator(operator);
  return operators[operator].associativity;
};
// Function to compare operator precedence and associativity
export const hasHigherPrecedence = (op1, op2) => {
  const op1Data = {
    precedence: getPrecedence(op1),
    associativity: getAssociativity(op1),
  };
  const op2Data = {
    precedence: getPrecedence(op2),
    associativity: getAssociativity(op2),
  };
  if (op1Data.precedence === op2Data.precedence) {
    if (op1Data.associativity === "left") {
      return true;
    } else {
      return false;
    }
  }

  return op1Data.precedence > op2Data.precedence;
};

// add space before fieldOperators and brackets
export const addSpace = (input) => {
  const specialCharacters = {
    "(": " ( ",
    ")": " ) ",
    "=": " = ",
    "<": " < ",
    ">": " > ",
  };
  let queryArray = input.split("");
  let newQueryArray = input.split("");
  let inQuotes = false;
  queryArray.forEach((q, index) => {
    if (Object.keys(specialCharacters).includes(q) && !inQuotes) {
      if (q === "=") {
        let space = "";
        if (index > 0 && ["<", ">"].includes(queryArray[index - 1])) space = "";
        else space = " ";
        newQueryArray[index] = space + q + " ";
      } else if (["<", ">"].includes(q)) {
        let space = "";
        if (index < queryArray.length - 1 && queryArray[index + 1] === "=")
          space = "";
        else space = " ";
        newQueryArray[index] = " " + q + space;
      } else {
        newQueryArray[index] = specialCharacters[q];
      }
    }
    if (q === '"') inQuotes = !inQuotes;
  });
  input = newQueryArray.join("");
  return input.replaceAll(/\s+/g, " ").trim();
};
//reverse given string
const reverseString = (str) => {
  return str.split("").reverse().join("");
};
/*
take input( expression) and position of fieldOperator
exract expression and return left ( field ) operator and right (righthand side).
example:
input  (IN=(Pete?r) or (TI=(fun)))  position: 26
output:{ left: 'TI', op: '', right: '( fun )' }
*/
export const findLeftOpRight = ({ input, pos, replaceSpace }) => {
  let left = "",
    count = 0,
    i = pos - 1;
  let fieldOp = "";
  fieldOp = input[pos];
  if (input[pos + 1] === "=") {
    fieldOp += input[pos + 1];
  }
  while (i >= 0 && input[i] === " ") i--;
  while (i >= 0 && input[i] !== " ") {
    left += input[i--];
  }
  while ((i >= 0 && input[i] === " ") || input[i] === "(") i--;
  let op = "";
  while (i >= 0 && input[i] != " ") {
    op += input[i--];
  }
  let right = "";
  i = pos + 1;
  if (fieldOp.length > 1) i++;
  while (i < input.length && input[i] === " ") i++;
  count = 0;
  for (; i < input.length; i++) {
    if (input[i] === " " && count === 0) break;
    if (input[i] === ")") count--;
    else if (input[i] === "(") count++;
    right += input[i];
    if (count < 0) break;
  }
  left = reverseString(left);
  op = reverseString(op);
  if (replaceSpace) right = formatRight({ right, field: left });
  return { fieldOp, left, op, right };
};
export const findAllOccurrences = (str, substr) => {
  str = str.toLowerCase();

  let result = [];

  let idx = str.indexOf(substr);

  while (idx !== -1) {
    if (["<", ">"].includes(substr)) {
      if (str[idx + 1] != "=") {
        result.push(idx);
      }
    } else if (["="].includes(substr)) {
      if (!["<", ">"].includes(str[idx - 1])) {
        result.push(idx);
      }
    } else {
      result.push(idx);
    }
    idx = str.indexOf(substr, idx + 1);
  }
  return result;
};
/**
 * Change space to adj if it satisfies conditions
 */
const formatRight = ({ right, field }) => {
  let rightArr = splitBySpace(right.replaceAll(" ", "  "));

  const nonOperandTokens = Object.keys(operators);
  for (let i = 0; i < rightArr.length; i++) {
    if (i !== 0 && i !== rightArr.length - 1) {
      if (rightArr[i].length === 0) {
        if (
          ![...nonOperandTokens, "("].includes(
            formatOperator(rightArr[i - 1])
          ) &&
          ![...nonOperandTokens, ")"].includes(formatOperator(rightArr[i + 1]))
        ) {
          if (textFieldsList.includes(field.toUpperCase())) {
            rightArr[i] = "ADJ";
          } else {
            rightArr[i] = "OR";
          }
        }
      }
    }
  }
  right = rightArr.join(" ");
  right = removeExtraSpaces(right);
  return right;
};

export const processEquations = ({ input, indices, replaceSpace = false }) => {
  const equations = [],
    operators = [];
  indices.forEach((index) => {
    const { fieldOp, left, op, right } = findLeftOpRight({
      input,
      pos: index,
      replaceSpace,
    });
    equations.push({ equation: `${left} ${fieldOp} ${right}`, field: left });
    if (isOperator(op)) operators.push(op);
  });
  return { equations, operators };
};

export const isBalancedParenthesis = (str) => {
  const stack = [];

  // Map of opening and closing parentheses
  const parenthesesMap = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  // Iterate through each character in the string
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    // If the character is an opening parenthesis, push it to the stack
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    }
    // If the character is a closing parenthesis
    else if (char === ")" || char === "]" || char === "}") {
      // If the stack is empty or the top of the stack does not match the current closing parenthesis
      if (stack.length === 0 || parenthesesMap[stack.pop()] !== char) {
        return false;
      }
    }
  }

  // If there are any remaining opening parentheses in the stack, the string is not balanced
  return stack.length === 0;
};
export const removeExtraSpaces = (str) => {
  return str.replace(/\s+/g, " ").trim();
};
/*
 isValidConversion is an attempt to find if connversion is valid or not.
 it will check if all tokens of input comes in same order in output or not.
 it may miss some invalid conversion as it checks only order of input token in output.
*/
export const isValidConversion = (input, output) => {
  if (!isBalancedParenthesis(output)) {
    return false;
  }
  input = input.toLowerCase();
  output = output.toLowerCase();
  input = removeExtraSpaces(addSpace(input));
  let inputArr = input.split("");
  let inQuotes = false;
  inputArr.forEach((q, index) => {
    if (["(", ")"].includes(q) && !inQuotes) {
      inputArr[index] = "";
    }
    if (q === '"') inQuotes = !inQuotes;
  });
  input = inputArr.join("");
  let outputArr = output.split("");
  inQuotes = false;
  outputArr.forEach((q, index) => {
    if (["(", ")"].includes(q) && !inQuotes) {
      outputArr[index] = "";
    }
    if (q === '"') inQuotes = !inQuotes;
  });
  output = outputArr.join("");
  inputArr = splitBySpace(input);
  inputArr = inputArr.filter((i) => i.length > 0);
  outputArr = splitBySpace(output);
  let i = 0,
    j = 0;
  while (i < inputArr.length && j < outputArr.length) {
    while (inputArr[i] !== outputArr[j] && j < outputArr.length) {
      j++;
    }
    i++;
  }
  if (i >= inputArr.length) {
    return true;
  } else {
    return false;
  }
};

// capitalize all operators in given input query
export const formatOperatorsInput = (input) => {
  const allOperators = Object.keys(operators);
  let inputArr = splitBySpace(input);
  allOperators.forEach((operator) => {
    let regexValue = "";
    if (specialOperators.includes(operator)) {
      regexValue = `\\b${operator}[0-9]*\\b`;
    } else {
      regexValue = `\\b${operator}\\b`;
    }
    const regex = new RegExp(regexValue, "gi");
    inputArr = inputArr.map((i) => {
      if (i.includes('"')) {
        return i;
      } else {
        return i.replaceAll(regex, (match) => {
          return match.toUpperCase();
        });
      }
    });
  });
  return inputArr.join(" ");
};

export const findAllOccurrencesOfFieldOperators = (input) => {
  let indices = [];
  fieldOperators.forEach((fieldOperator) => {
    indices = [...indices, ...findAllOccurrences(input, fieldOperator)];
  });
  indices.sort((a, b) => a - b);
  return indices;
};
/**
 * Split string by space and return array of substrings
 * It will treat "a mobile is good" will be treated as a single token
 */
export const splitBySpace = (right) => {
  let rightArr = [];
  let chunk = "";
  for (let i = 0; i < right.length; i++) {
    if (right[i] === " " || (i + 1 < right.length && right[i + 1] === '"')) {
      if (chunk[0] === '"') {
        if (chunk.length > 1 && chunk[chunk.length - 1] === '"') {
          rightArr.push(chunk);
          chunk = "";
        } else {
          chunk += right[i];
        }
      } else {
        rightArr.push(chunk);
        chunk = "";
      }
    } else {
      chunk += right[i];
    }
  }
  rightArr.push(chunk);
  return rightArr;
};

/**
 * remove redundant brackets
 * ex. input: SS = ((((a ADJ ((b ADJ c)) ADJ d))))
 *     output: SS = (a ADJ (b ADJ c) ADJ d)
 */
export const removeRedundantBrackets = (str) => {
  let open = [],
    close = [],
    pairs = [];
  for (let index = 0; index < str.length; index++) {
    const token = str[index];
    if (token === "(") open.push(index);
    if (token === ")") close.push(index);
  }
  for (let close_index = 0; close_index < close.length; close_index++) {
    let open_index = 0;
    while (open_index < open.length && close[close_index] > open[open_index]) {
      open_index++;
    }
    open_index--;
    pairs.push({ open: open[open_index], close: close[close_index] });
    open = open.filter((i) => i !== open[open_index]);
  }
  str = str.split("");
  pairs = pairs.sort((pair1, pair2) =>
    pair1.open > pair2.open ? 1 : pair1.open < pair2.open ? -1 : 0
  );
  for (let i = 0; i < pairs.length - 1; i++) {
    if (
      pairs[i].close -
        pairs[i].open -
        (pairs[i + 1].close - pairs[i + 1].open) ===
      2
    ) {
      str[pairs[i].open] = "#";
      str[pairs[i].close] = "#";
    }
  }
  return str.join("").replaceAll("#", "");
};

/**
 *
 */
export const expandSpecialOperators = (operand1, operator, operand2) => {
  let infixExpression = "";
  if (!specialOperators.includes(formatOperator(operator))) {
    infixExpression = ` ( ${operand1} ${operator} ${operand2} ) `;
  } else {
    if (isTerm(operand1) && isTerm(operand2)) {
      infixExpression = ` ( ${operand1} ${operator} ${operand2} ) `;
    } else {
      let operand1Arr = splitBySpace(operand1).filter(
        (token) => token.length > 0
      );
      let operand2Arr = splitBySpace(operand2).filter(
        (token) => token.length > 0
      );
      let allOperators = Object.keys(operators);
      const nonOperandTokens = ["", "(", ")", ...allOperators].filter(
        (token) => !specialOperators.includes(token)
      );
      for (let i = 0; i < operand1Arr.length; i++) {
        if (nonOperandTokens.includes(formatOperator(operand1Arr[i]))) {
          infixExpression += " " + operand1Arr[i] + " ";
          continue;
        }
        let leftOperand = "";
        while (
          i + 1 < operand1Arr.length &&
          specialOperators.includes(formatOperator(operand1Arr[i + 1]))
        ) {
          leftOperand += " " + operand1Arr[i] + " " + operand1Arr[i + 1];
          i = i + 2;
        }
        if (i < operand1Arr.length) leftOperand += " " + operand1Arr[i] + " ";
        for (let j = 0; j < operand2Arr.length; j++) {
          if (nonOperandTokens.includes(formatOperator(operand2Arr[j]))) {
            infixExpression += " " + operand2Arr[j] + " ";
            continue;
          } else {
            let rightOperand = "";
            while (
              j + 1 < operand2Arr.length &&
              specialOperators.includes(formatOperator(operand2Arr[j + 1]))
            ) {
              rightOperand += " " + operand2Arr[j] + " " + operand2Arr[j + 1];
              j = j + 2;
            }

            if (j < operand2Arr.length)
              rightOperand += " " + operand2Arr[j] + " ";

            infixExpression += ` ( ${leftOperand} ${operator} ${rightOperand} ) `;
          }
        }
      }
    }
  }
  return infixExpression;
};

/*
return true if given token is a term.
mobile => true
(mobile and phone) => false
*/
export const isTerm = (token) => {
  if (token.indexOf(" ") !== -1) return false;
  else return true;
};
//This function removes space if exist before and after field operators
export const removeSpaceFieldOperators = (query) => {
  query = query.replaceAll(/\s*([=<>]+)\s*/g, "$1");
  return query;
};

/*format number fields' right hand side to make it single value.
input: ( TI = ( ( ( mobile ADJ table ) AND phone ) ) AND PN <= ( EP3624471A1 OR US10701698B2 OR EP3624471A1 ) )
output: ( TI = ( ( ( mobile ADJ table ) AND phone ) ) AND PN <= ( " EP3624471A1 US10701698B2 EP3624471A1 " ) )
If isForHighlightWords is true then it will set number fields value as first number
input ( TI = ( ( ( mobile ADJ table ) AND phone ) ) AND PN <= ( EP3624471A1 OR US10701698B2 OR EP3624471A1 ) )
output ( TI = ( ( ( mobile ADJ table ) AND phone ) ) AND PN <= ( EP3624471A1 ) )
*/
export const formatNumberFields = (input, options = {}) => {
  const { isForHighlightWords = false } = options;
  input = addSpace(input);
  input = removeExtraSpaces(input);
  input = formatOperatorsInput(input);
  const indices = findAllOccurrencesOfFieldOperators(input);
  let newEquations = processFieldExpressions(input, indices);
  newEquations.forEach((eqs) => {
    if (numberFieldsList.includes(eqs.field)) {
      const equationArray = eqs.equation
        .split(" ")
        .filter((val) => val.length > 0);
      let allOperators = Object.keys(operators);
      let allNumbers = equationArray
        .slice(3)
        .filter(
          (val) => !["(", ")", ...allOperators].includes(val.toUpperCase())
        );
      //uncomment to add validation for numbers.
      // allNumbers.forEach((num) => {
      //   checkNumberValidation(field, { term: num });
      // });

      let oldEq = eqs.equation.split(" ").slice(2).join(" ");
      let newEq = `( "${eqs.equation
        .split(" ")
        .slice(2)
        .join(" ")
        .replaceAll(/\(|\)|OR|AND"/g, "")
        .trim()}" )`;
      if (isForHighlightWords) {
        newEq = `( ${allNumbers[0]} )`;
      }
      input = input.replaceAll(oldEq, newEq);
    }
  });
  return input;
};
