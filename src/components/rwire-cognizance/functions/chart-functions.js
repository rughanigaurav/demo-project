import { checkFieldTypeKeywordBase } from "../../../common/utils";

export const generateFilterKeysQuery = (listFilters) => {
  let filterQuery = [];

  // eslint-disable-next-line array-callback-return
  listFilters.map((i, key) => {
    if (i.selected) {
      const terms = [];
      // eslint-disable-next-line array-callback-return
      Object.keys(i.selected).map((item) => {
        listFilters[key].selected[item].length > 0 && listFilters[key].selected[item].map((i) => {

          const field = checkFieldTypeKeywordBase(item) ? item : `${item}.keyword`;

          if (item === "ED") {
            return terms.push({
              "range": {
                "ED": {
                  "gte": `${i}||/y`,
                  "lte": `${i}||/y`,
                  "format": "yyyy"
                }
              }
            })
          }

          return terms.push({
            "term": {
              [field]: i
            }
          });

        });
      })

      if (terms.length > 0) {
        return filterQuery.push({
          "bool": {
            "should": terms
          }
        });
      }

      return [];
    }
  });

  return filterQuery;
};
