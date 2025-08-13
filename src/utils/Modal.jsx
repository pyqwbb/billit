import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  width: 350px;
  max-width: 90%;
  padding: 30px 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  position: relative;
  animation: ${fadeIn} 0.25s ease-out;
  font-family: 'NanumSquareRoundOTFR';
`;

const Title = styled.h2`
  margin: 0 0 20px 0;
  font-size: 22px;
  font-family: 'NanumSquareRoundOTFEB';
  color: #333;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
  
  &:hover {
    color: #555;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: 'NanumSquareRoundOTFB';
  transition: background 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const ConfirmButton = styled(ModalButton)`
  background: var(--main-color-ver2);
  color: #fff;
`;

export const CancelButton = styled(ModalButton)`
  background: #f1f1f1;
  color: #333;
`;

const Modal = ({ title, children, buttons = [], onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{title}</Title>
        <div>{children}</div>
        {buttons.length > 0 && <ButtonGroup>{buttons.map((btn, i) => btn)}</ButtonGroup>}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
