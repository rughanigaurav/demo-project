import {
  addSpace,
  findAllOccurrencesOfFieldOperators,
  formatOperatorsInput,
  processEquations,
  removeExtraSpaces,
  removeSpaceFieldOperators,
} from "./pre-process-input/utils";
import { cleanQuery } from "./query-functions";
export const getChunksData = (query) => {
  let userQuery = query;
  userQuery = cleanQuery(userQuery);
  let input = addSpace(userQuery);
  input = removeExtraSpaces(input);
  input = formatOperatorsInput(input);
  const indices = findAllOccurrencesOfFieldOperators(input);

  let { equations, operators } = processEquations({
    input: formatOperatorsInput(input),
    indices,
    replaceSpace: false,
  });
  equations = equations.map((eq) => removeSpaceFieldOperators(eq.equation));
  return { equations, operators, input };
};
