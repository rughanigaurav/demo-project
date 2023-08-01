/* eslint-disable */
import { fetch } from "../service/fetch";
import { fieldNameFromShortCodeExport } from "../common/field-map";
import { queryProcess } from "../common/query-functions";
import peggy from "../resources/parser/parser";
import { generateQuery } from "../common/generate-rec-query";
import { getSelectedFilters, tempSelected } from "./aggregationFunction";
import { generateFilterKeysQuery } from "../components/rwire-cognizance/functions/chart-functions";

export const setExport = (payload) => ({
  type: "EXPORT_SET",
  payload: {
    ...payload,
  },
});

export const setSelectedField = (payload) => ({
  type: "EXPORT_SET",
  payload: {
    ...payload,
  },
});

export const setSortedRecords = (payload) => ({
  type: "EXPORT_SET",
  payload: {
    ...payload,
  },
});

export const exportMailRecord =
  ({
    emails,
    subject,
    fileName,
    message,
    isDownload = false,
    searchBody,
    searchFields,
  }) =>
  async (dispatch, getState) => {
    const {
      exportField: { selectedFields, selectedType: fileType = "csv" },
      resultTable: { selectedRows },
      app: { searchQuery },
    } = getState();
    let fieldsExportString = {};
    let exportQueryJson = {};

    if (!searchBody) {
      selectedFields.map((ev) => {
        fieldsExportString[ev] = fieldNameFromShortCodeExport(ev);
      });

      fieldsExportString = JSON.stringify(fieldsExportString);
      let filters = getSelectedFilters(getState().resultTable);

      exportQueryJson = JSON.stringify({
        query: searchQuery,
        filters: filters,
        selectedRows: selectedRows,
      });
    } else {
      fieldsExportString = searchFields;
      exportQueryJson = searchBody;
    }

    try {
      const response = await fetch({
        url: "/api/export-request",
        body: {
          queryBody: exportQueryJson,
          exportFields: fieldsExportString,
          fileType,
          ...{ emails, subject, fileName, message, isDownload },
        },
      });

      dispatch(
        setExport({
          isExportSent: true,
        })
      );

      return response;
    } catch (error) {
      dispatch(
        setExport({
          isExportMailError: error.message,
        })
      );

      return "Error";
    }
  };
