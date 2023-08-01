import React from "react";
import DropDown from "./rwire-drop-down-date-country";
export default function RWireCountry(props) {

  const { plus, minus, fieldData, setCountryField } = props;
  let nextId = fieldData.length;

  const handleRemoveItem = (e) => {
    setCountryField(fieldData.filter((item) => item.id !== e));
  };

  const addFielded = (item, id, index) => {
    item.id = nextId;
    fieldData.splice(index, 0, item);
    setCountryField([...fieldData]);
  };


  const handleChange =(event, index)=>{
    // eslint-disable-next-line array-callback-return
    fieldData.map((item, key)=>{
      // eslint-disable-next-line eqeqeq
      if(index == key){
        fieldData[key].filedsinput = event.target.value
      }
     })
     setCountryField([...fieldData])
  }

  const handleSelect = (eventKey, index) => {
    // eslint-disable-next-line array-callback-return
    fieldData.map((item, key)=>{
     // eslint-disable-next-line eqeqeq
     if(index == key){
      fieldData[key].operatersvalue = eventKey.target.value
     }
    })
    setCountryField([...fieldData])
   };


   const handleKeyPress = (event) => {
    const alertData = "`~!@#$%&^*_=-[]{}()'+?/:<> Symbols are not permitted"
    if (event.key === "$" || event.key === "^" || event.key === "(" || event.key === ")" || event.key === "+" || event.key === "?" || event.key === "/" || event.key === "*" || event.key === "." || event.key === '"' || event.key === "'" || event.key === "]" || event.key === "[" || event.key === "!" || event.key === "@" || event.key === "#" || event.key === "%" || event.key === "&" || event.key === "-" || event.key === "_" || event.key === "=" || event.key === ":" || event.key === ">" || event.key === "<" || event.key === "{" || event.key === "}" || event.key === "`" || event.key === "~") {
      event.preventDefault();
      // eslint-disable-next-line no-console
      console.log(alertData);
    }
  }



  return (
    <>
      {fieldData.map((item, index) => {
        return (
          <div className="status-state-type-pub">
            <div className="status-main status-main-for-input">
            <select className="status-button select-and operater-select country-and" onChange={event => handleSelect(event, index)}>
                {item.operaters.map((optionData, index) => {
                  return <option>{optionData.valuecode}</option>;
                })}
              </select>
           <DropDown item={item} fieldData={fieldData} index={index} setAllField={setCountryField}/>
              <div className="check-status status-dobule-input country-input">
                <input
                  type="text"
                  className="date-search date-search-XX"
                  placeholder="XX"
                  onChange={event => handleChange(event, index)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button
                type="button"
                className="status-button status-plus country-plus"
                onClick={() => addFielded({ ...item }, { id: nextId++ }, index)}
              >
                <img src={plus} alt=""/>
              </button>
              <button
                type="button"
                className="status-button status-plus country-minus county radius-minus"
                onClick={() => handleRemoveItem(item.id)}
              >
                <img src={minus} alt=""/>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
