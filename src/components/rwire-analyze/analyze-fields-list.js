import { Box } from './box';
import { uuidv4 } from '../../action/app';
import { useEffect, useState } from 'react';

let searchTimer = null;

const AnalyzeFieldsList = (props) => {
  const { dragableFields } = props;

  const [query, setQuery] = useState("");
  const [fieldOptions, setFieldOptions] = useState([]);

  useEffect(() => {
    setFieldOptions(dragableFields);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setQuery(value);
    clearTimeout(searchTimer);

    const filteredData = dragableFields.filter((i) => {
      if (
        i.title.toLowerCase().includes(value.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });

    setFieldOptions(filteredData);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleSearchChange}
        value={query}
        placeholder="Search..."
        className='analyze-search-input'
      />
      <div className="droppable-fields-list normal-scroll-bar">
        {fieldOptions.map((i, k) => {
          return <Box key={uuidv4()} name={i.code} code={i.code} title={i.title} {...props} />
        })}
      </div>
    </div>
  )
}

export default AnalyzeFieldsList;
