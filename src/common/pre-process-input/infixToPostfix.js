import { isOperator, splitBySpace } from "./utils.js";
import { hasHigherPrecedence } from "./utils.js";

export const infixToPostfix = (expression) => {
  let outputQueue = [];
  let operatorStack = [];

  // Iterate through each token in the expression
  const tokens = splitBySpace(expression);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === "") {
      continue; // Skip empty token
    } else if (isOperator(token)) {
      // Handle operators
      while (
        operatorStack.length > 0 &&
        isOperator(operatorStack[operatorStack.length - 1]) &&
        hasHigherPrecedence(operatorStack[operatorStack.length - 1], token)
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === "(") {
      // Handle opening parentheses
      operatorStack.push(token);
    } else if (token === ")") {
      // Handle closing parentheses
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop(); // Discard "("
    } else {
      // Handle operands
      outputQueue.push(token);
    }
  }

  // Push remaining operators from the stack to the output queue
  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  return outputQueue.join(" ");
};

// // Example usage:
// const infixExpression = "SS = table and  mobile or phone ";
// const postfixExpression = infixToPostfix(infixExpression);
// console.log(postfixExpression); // Output: "three four two multiply one five subtract two three power power divide add"
