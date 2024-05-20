import styled from "styled-components";

export default function SuccessModal({ setModalIsOpen }) {
  return (
    <StyledModal>
      <h2>Success!</h2>
      <p>Your invoice has been sent successfully.</p>
      <CloseButton onClick={() => setModalIsOpen(false)}>×</CloseButton>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 34px 32px;
  border-radius: 8px;
  color: ${(props) => props.theme.textColor};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 327px;
  display: flex;
  flex-direction: column;
  text-align: left;
  z-index: 1;

  & > p {
    font-size: 13px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.10000000149011612px;
    text-align: left;
    margin-top: 20px;
    color: ${(props) => props.theme.labelColor};
  }

  & > h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -0.5px;
    text-align: left;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 17px;
  cursor: pointer;
`;
