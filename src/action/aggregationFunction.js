import { filterSearchAggInclude } from "../common/data-functions";
import { checkFieldTypeKeywordBase } from "../common/utils";
import {
  filterSelected,
  filtersJson,
} from "../components/common/patents-result-common/rwire-filter-modal";

export const createFieldsObject = (arr)=> {
  return arr.reduce((acc, curr) => {
    acc[curr] = { number_of_fragments: 0 };
    return acc;
  }, {});
}
export const tempaggregate1 = (fields, filtersSearchText, collapseField) => {
  let temp = {};
  let subQuery = {
    aggsUniqueCount: {
      cardinality : {
        field : collapseField
      }
    }
  }
  // eslint-disable-next-line array-callback-return
  fields.map((field) => {
    if (field === "ED") {
      let hardBounds;
      if (filtersSearchText.ED) {
        const filterSearch = filterSearchAggInclude(
          "ED",
          filtersSearchText.ED.toString()
        );
        if (filterSearch[0]) {
          hardBounds = {
            min: `${filterSearch[0]}`,
            max: `${filterSearch[filterSearch.length - 1] + 1}`,
          };
        }
      }
      let temp1 = {
        date_histogram: {
          min_doc_count: 1,
          hard_bounds: hardBounds,
          field: "ED",
          calendar_interval: "year",
          format: "yyyy",
          order: {
            _count: "desc",
          },
        },
      };
      temp = { ...temp, [field]: {...temp1, aggs: subQuery }};
    } else {
      let temp1 = {
        terms: {
          field: checkFieldTypeKeywordBase(field) ? field : `${field}.keyword`,
          order: {
            _count: "desc",
          },
          size: 1000,
          include: filterSearchAggInclude(
            field,
            filtersSearchText[field] ? filtersSearchText[field] : ""
          ),
        },
      };
      temp = { ...temp, [field]: {...temp1, aggs: subQuery}};
    }
  });
  return temp;
};

export const tempSelected = (store) => {
  let temp = [];
  // eslint-disable-next-line array-callback-return
  Object.keys(filtersJson).map((filter) => {
    let temp1 = {
      selected: {
        [filtersJson[filter]]: store[filterSelected[filter]],
      },
    };
    temp.push(temp1);
  });
  return temp;
};

// this function will return selected filters' list
export const getSelectedFilters = (store)=>{
  let filters = [];
   // eslint-disable-next-line array-callback-return
   Object.keys(filtersJson).map((filter) => {
    // console.log("filter "+filtersJson[filter]+"store "+store[filterSelected[filter]]);
    if (store[filterSelected[filter]].length > 0)
      filters.push({
        [filtersJson[filter]]: store[filterSelected[filter]],
      });
  });
  return filters;
}