import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 40px;
`;

const DropdownButton = styled.button`
  background-color: white;
  color: black;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid white;
  text-align: left;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  z-index: 1;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const DropdownListItem = styled.li`
  background-color: #f1f1f1;
  color: black;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const Dropdown = ({ options, value, setFieldValue, setSelectedOption, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setFieldValue("expenseItem", option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown} type="button">
        {selectedOption || "Выбрать из списка"}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownListItem
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;