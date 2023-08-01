import React from "react";
import { Input } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

const RwireTextInputWithSearchIcon = (props) => {
  const { onChange, inputClassName, iconClassName, outerDivName, placeholder } =
    props;
  return (
    <div className={`${outerDivName} position-relative p-1`}>
      <Input
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
      />
      <SearchIcon className={`${iconClassName} position-absolute`} />
    </div>
  );
};

export default RwireTextInputWithSearchIcon;
