import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const buttonStyle = {
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: 700,
    width: "22%",
  };

  const hoverStyle = {
    backgroundColor: "gold",
    color: "black",
  };

  return (
    <span
      onClick={onClick}
      style={selected ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
    >
      {children}
    </span>
  );
};

export default SelectButton;
