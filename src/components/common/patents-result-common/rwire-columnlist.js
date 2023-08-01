import React from "react";
import "../../../assets/css/columns.scss";
function checkDateStatus(dateString) {
  const currentDate = new Date();
  const inputDate = new Date(
    dateString.substring(0, 4),
    dateString.substring(4, 6) - 1,
    dateString.substring(6, 8)
  );

  if (inputDate > currentDate) {
    return "ALIVE";
  } else {
    return "DEAD";
  }
}

const RwireColumnList = ({ items }) => {
  const itemsPerColumn = Math.ceil(items.length / 3);

  // Split the items into three columns
  const columns = [
    items.slice(0, itemsPerColumn),
    items.slice(itemsPerColumn, itemsPerColumn * 2),
    items.slice(itemsPerColumn * 2),
  ];

  return (
    <div className="column-list">
      {columns.map((column, index) => (
        <ul key={index} className="column">
          {column.map((item, itemIndex) => (
            <li key={itemIndex} className="text-justify display-block">
              {item.split(" ")[0]}
              {" - "} {checkDateStatus(item.split(" ")[1])}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default RwireColumnList;
