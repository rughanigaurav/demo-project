import { fieldOperators, specialOperators } from "./constant.js";
import {
  expandSpecialOperators,
  formatOperator,
  isOperator,
  splitBySpace,
} from "./utils.js";

export const postfixToInfix = (expression) => {
  let operandStack = [];

  // Iterate through each token in the expression
  const tokens = splitBySpace(expression);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (isOperator(token)) {
      // Handle operators
      const operand2 = operandStack.pop();
      const operand1 = operandStack.pop();
      let infixExpression = "";
      if (fieldOperators.includes(token)) {
        infixExpression = `${operand1} ${token} ( ${operand2} ) `;
      } else {
        if (specialOperators.includes(formatOperator(token))) {
          infixExpression = expandSpecialOperators(operand1, token, operand2);
        } else {
          infixExpression = ` ( ${operand1} ${token} ${operand2} ) `;
        }
      }

      operandStack.push(infixExpression);
    } else {
      // Handle operands
      operandStack.push(token);
    }
  }

  return operandStack.pop();
};
