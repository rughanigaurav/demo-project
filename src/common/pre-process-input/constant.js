// precedence increase with it's value.
// ex. = has less precedence than or
export const operators = {
  ADJ: { precedence: 4, associativity: "left" },
  NEAR: { precedence: 4, associativity: "left" },
  AND: { precedence: 3, associativity: "left" },
  NOT: { precedence: 3, associativity: "left" },
  OR: { precedence: 2, associativity: "left" },
  "=": { precedence: 1, associativity: "right" },
  "<=": { precedence: 1, associativity: "right" },
  ">=": { precedence: 1, associativity: "right" },
  "<": { precedence: 1, associativity: "right" },
  ">": { precedence: 1, associativity: "right" },
};
export const fieldOperators = ["=", "<=", ">=", "<", ">"];
// these are special operators as they may have distance attached with them.
// ex. ADJ10, NEAR5
export const specialOperators = ["ADJ", "NEAR"];
