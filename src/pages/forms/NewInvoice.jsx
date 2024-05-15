import styled from "styled-components";
import { useContext } from "react";
import { invoiceContext } from "../../App";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoBack from "../../shared-components/GoBack";

export default function NewInvoice() {
  const { invoiceData, setInvoiceData } = useContext(invoiceContext);

  const schema = yup.object({
    address: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // payment terms: net 30 days, 7 days, 1 day, 14 days

  return (
    <Form>
      <GoBack />
      <h1>New Invoice</h1>

      <h3>Bill From</h3>

      <div className="bill-group">
        <div className="label-box">
          <label htmlFor="from-street">
            Street Address
            <input type="text" id="from-street" />
          </label>
        </div>

        <div className="country-flex-box">
          <div className="label-box">
            <label htmlFor="city">
              City
              <input type="text" id="city" />
            </label>
          </div>

          <div className="label-box">
            <label htmlFor="post-code">
              Post Code
              <input type="text" id="post-code" />
            </label>
          </div>

          <div className="label-box">
            <label htmlFor="country">
              Country
              <input type="text" id="country" />
            </label>
          </div>
        </div>
      </div>

      <h3>Bill to</h3>

      <div className="bill-group">
        <div className="label-box">
          <label htmlFor="client-name">
            Client's Name
            <input type="text" id="client-name" />
          </label>
        </div>

        <div className="label-box">
          <label htmlFor="client-email">
            Client's Email
            <input type="text" id="client-email" />
          </label>
        </div>

        <div className="label-box">
          <label htmlFor="client-st-address">
            Street Address
            <input type="text" id="client-st-address" />
          </label>
        </div>

        <div className="country-flex-box">
          <div className="label-box">
            <label htmlFor="client-city">
              City
              <input type="text" id="client-city" />
            </label>
          </div>

          <div className="label-box">
            <label htmlFor="client-post-code">
              Post Code
              <input type="text" id="client-post-code" />
            </label>
          </div>

          <div className="label-box">
            <label htmlFor="client-country">
              Country
              <input type="text" id="client-country" />
            </label>
          </div>
        </div>
      </div>
    </Form>
  );
}

const Form = styled.form`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  padding: 24px 22px;
  background-color: ${(props) => props.theme.formsBackground};

  & > h1 {
    color: ${(props) => props.theme.textColor};
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -0.5px;
    margin-top: 25px;
    margin-bottom: 22px;
  }

  & > h3 {
    color: rgba(124, 93, 250, 1);
    font-size: 15px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: -0.25px;
    margin-bottom: 24px;
  }

  & .label-box {
    & > label {
      display: flex;
      flex-direction: column;
      gap: 9px;
      color: ${(props) => props.theme.labelColor};
      font-size: 13px;
      font-weight: 500;
      line-height: 15px;
      letter-spacing: -0.10000000149011612px;

      & > input {
        border: ${(props) => props.theme.textFieldBorder};
        border-radius: 5px;
        padding: 18px 20px 15px;
        color: ${(props) => props.theme.textColor};
        font-size: 15px;
        font-weight: 700;
        line-height: 15px;
        letter-spacing: -0.25px;
        outline: none;
      }
    }
  }

  /* & > .bill-group {
    display: flex;
    flex-direction: column;
    gap: 25px;
  } */

  & > .country-flex-box {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;
