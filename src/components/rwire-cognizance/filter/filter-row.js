const FilterRow = (props) => {
  const { id, listFilters,chartId, filterName, filterDocCount, isSelected, onSetChart } = props;

  const handleClick = () => {
    // eslint-disable-next-line array-callback-return
    listFilters[chartId] && listFilters[chartId].map((i, k) => {
      if(i.id === id) {

        if (listFilters[chartId][k]["selected"]) {
          const filterSelectedType = Object.keys(listFilters[chartId][k]["selected"])[0];

          const elementIndex = listFilters[chartId][k]["selected"][filterSelectedType].indexOf(filterName);
          if(elementIndex > -1) {

            listFilters[chartId][k]["selected"][filterSelectedType].splice(elementIndex, 1);
          } else {

            listFilters[chartId][k]["selected"][filterSelectedType].push(filterName);
          }
        }
      }
    });

    onSetChart({listFilters: {...listFilters}});

  }

  return (
    <div className="d-flex my-1">
      <div className="">
        <input
          className="field-checkbox filter-checkbox small me-2 cursor-pointer"
          type="checkbox"
          onClick={handleClick}
          defaultChecked={isSelected}
          id={filterName}
          data-filter-pos={id}
        />
      </div>
      <div>{filterName.toUpperCase()} ({filterDocCount})</div>
    </div>
  )
}

export default FilterRow;
