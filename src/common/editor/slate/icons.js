import React from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatListNumbered,
  MdFormatListBulleted,
} from "react-icons/md";


const iconList = (theme) => {
  return {
    bold: <MdFormatBold size={20} color={ theme ? "white" : "grey"} />,
    italic: <MdFormatItalic size={20} color={ theme ? "white" : "grey"} />,
    underline: <MdFormatUnderlined size={20} color={ theme ? "white" : "grey"} />,
    orderedList: <MdFormatListNumbered size={20} color={ theme ? "white" : "grey"} />,
    unorderedList: <MdFormatListBulleted size={20} color={ theme ? "white" : "grey"} />,
  }
};

const Icon = (props) => {
  const { icon, theme } = props;
  const t = iconList(theme);
  return t[icon];
};

export default Icon;
