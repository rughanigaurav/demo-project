import Select from "react-select";

const TopNumberFilter = (props) => {
  const { onHandleTopResultSet, topNumberSize = "10" } = props;

  const handleTopSelect = (value) => {
    onHandleTopResultSet("", value.value);
  };

  return (
    <Select
      onChange={handleTopSelect}
      options={[
        { value: "10", label: "Top 10" },
        { value: "20", label: "Top 20" },
        { value: "50", label: "Top 50" },
        { value: "100", label: "Top 100" },
      ]}
      defaultValue={{ value: topNumberSize, label: `Top ${topNumberSize}` }}
      styles={{
        option: (provided) => ({
          ...provided,
          fontSize: 12,
          cursor: "pointer",
        }),
        control: (styles) => ({
          ...styles,
          cursor: "pointer",
          minHeight: 30,
          height: 30,
        }),
        indicatorsContainer: (styles) => ({
          ...styles,
          cursor: "pointer",
          minHeight: 30,
          height: 30,
        }),
      }}
    />
  );
};

export default TopNumberFilter;
