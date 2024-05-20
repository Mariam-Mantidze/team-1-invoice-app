import styled from "styled-components";
import { useContext } from "react";
import { invoiceContext } from "../../../App";

export default function DiscardModal({ setDiscardDialogue }) {
  const { navigate } = useContext(invoiceContext);

  const handleDiscard = () => {
    navigate(-1);
  };
  return (
    <DiscardDialogue>
      <h2>Confirm Discarding</h2>
      <p>Are you sure you want to discard the form?</p>
      <div className="button-flex">
        <button onClick={() => setDiscardDialogue(false)} className="cancel">
          Cancel
        </button>
        <button onClick={handleDiscard} className="discard">
          Discard
        </button>
      </div>
    </DiscardDialogue>
  );
}

const DiscardDialogue = styled.div`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 34px 32px;
  border-radius: 8px;
  /* width: 400px; */
  /* text-align: center; */
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

  & h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -0.5px;
    text-align: left;
  }

  & p {
    font-size: 13px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.10000000149011612px;
    text-align: left;
    color: ${(props) => props.theme.labelColor};
    margin-top: 8px;
  }

  & .button-flex {
    display: flex;
    gap: 8px;
    margin-top: 22px;
    align-self: flex-end;
  }

  & button {
    padding: 16px 24px;
    font-size: 15px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: -0.25px;
    text-align: left;
    border-radius: 30px;
  }

  & .cancel {
    background: ${(props) => props.theme.cancelButtonBackground};
    color: ${(props) => props.theme.cancelButtonColor};
  }

  & .discard {
    background: rgba(236, 87, 87, 1);
    color: ${(props) => props.theme.discardButton};
  }
`;
