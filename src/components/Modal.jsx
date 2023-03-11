import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { CloseIcon } from "./Icons";
// Стили для модального окна
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
  line-height: 1;
  background-color: transparent;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

// Компонент модального окна
const Modal = ({ onClose, children }) => {
  const [showModal, setShowModal] = useState(true);

  // Обработчик для закрытия модального окна
  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      {showModal &&
        ReactDOM.createPortal(
          <Overlay onClick={handleCloseModal}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={handleCloseModal}><CloseIcon /></CloseButton>
              {children}
            </ModalContainer>
          </Overlay>,
          document.body
        )}
    </>
  );
};

export default Modal;
