import styled from "styled-components";

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid white;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    font-size: 12px;
    top: -18px;
    left: 0;
    color: #333;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: ${(props) => (props.hasValue ? "-18px" : "10px")};
  left: ${(props) => (props.hasValue ? "0" : "10px")};
  color: ${(props) => (props.hasValue ? "#333" : "#999")};
  font-size: ${(props) => (props.hasValue ? "12px" : "16px")};
  transition: all 0.2s ease-in-out;
`;

const InputWithLabel = ({ label, type, name, value, onChange }) => {

  return (
    <InputContainer>
      <StyledInput
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        name={name}
      />
      <StyledLabel htmlFor={name} hasValue={value !== ""}>
        {label}
      </StyledLabel>
    </InputContainer>
  );
};

export default InputWithLabel;
