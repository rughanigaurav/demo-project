import { useTranslation } from "react-i18next";
import Select from "react-select";

const TopNumberFilter = (props) => {
  const { t } = useTranslation();
  const { onHandleTopResultSet, topNumberSize = 10 } = props;

  const handleTopSelect = (value) => {
    onHandleTopResultSet("", value.value);
  };

  return (
    <Select
      onChange={handleTopSelect}
      options={[
        { value: "10", label: `${t("top_label")} 10` },
        { value: "20", label: `${t("top_label")} 20` },
        { value: "50", label: `${t("top_label")} 50` },
        { value: "100", label: `${t("top_label")} 100` },
      ]}
      defaultValue={{
        value: topNumberSize,
        label: `${t("top_label")} ${topNumberSize}`,
      }}
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
