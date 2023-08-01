import axios from "axios";

export const setKeyword = (payload) => ({
  type: "KEYWORD_SUGGESTOR_SET",
  payload: {
    ...payload,
  },
})

const formatUserQueryInput = (inputValues) => {
  inputValues = inputValues.toLowerCase();
  let replaceCollection = [["|", " , "], [",", " , "], [";", " , "], [" or ", " , "], [" and ", " , "], ["*", ""]]
  replaceCollection.forEach((replaceValue) => {
    inputValues = (inputValues.replaceAll(replaceValue[0], replaceValue[1]));
  })

  let inputCollection = inputValues.split(" ");
  inputCollection = (inputCollection.filter((tempInput) => tempInput.length > 0));
  return inputCollection.join(" ");
}

export const setSelectedRows = (selectedRows) => (dispatch) => {
  dispatch(setKeyword(selectedRows));
}


const getResponse = (keywords, tableData) => {
  return new Promise(async (resolve, reject) => {
    const global_store = {};
    for await (const item of keywords) {
      if (global_store[item] === undefined) {
        const { data } = await axios({
          url: `https://api.dictionaryapi.dev/api/v2/entries/en/${item}`,
        });
        const local_store = {};
        data[0].meanings.forEach((i) => {
          if (i.partOfSpeech === "noun") {
            if (local_store[item] === undefined) {
              local_store[item] = i.synonyms;
            } else {
              local_store[item] = [...local_store[item], ...i.synonyms];
            }
          }
        });
        global_store[item] = local_store[item];
      }
      tableData.push({ [item]: global_store[item] });
    }
    resolve();
  })
}


export const search = (keyword) => async (dispatch, getState) => {
  const formattedKeyword = formatUserQueryInput(keyword);
  const queryWords = formattedKeyword.split(" , ");
  const tableData = [];
  await getResponse(queryWords, tableData);

  dispatch(setKeyword({
    tableData,
  }))
};
