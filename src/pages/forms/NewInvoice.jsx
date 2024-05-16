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
          <div className="city-post-code-group">
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
          </div>

          <div className="label-box">
            <label htmlFor="country">
              Country
              <input type="text" id="country" />
            </label>
          </div>
        </div>
      </div>

      <h3 id="scnd-bill">Bill to</h3>

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
          <div className="city-post-code-group">
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
          </div>

          <div className="label-box">
            <label htmlFor="client-country">
              Country
              <input type="text" id="client-country" />
            </label>
          </div>
        </div>
      </div>

      <div className="invoice-date-description">
        <div className="invoice-payment-grp">
          <div className="label-box">
            <label htmlFor="invoice-date">
              Invoice Date
              <input id="invoice-date" type="date" />
            </label>
          </div>

          <div className="label-box">
            <label htmlFor="payment-terms">
              Payment Terms
              <select id="payment-terms" />
            </label>
          </div>
        </div>

        <div className="label-box">
          <label htmlFor="project-description">
            Project Description
            <input type="text" id="project-description" />
          </label>
        </div>
      </div>

      <div className="item-list">
        <h2>Item List</h2>

        <div className="item-inactive">
          <p className="item-name">Item Name</p>

          <div className="item-inactive-flex">
            <span>Qty.</span>
            <span>Price</span>
          </div>

          <p>Total</p>
        </div>

        <button>+ Add New Item</button>
      </div>

      <div className="submit-group">
        <button>Discard</button>
        <button>Save as Draft</button>
        <button>Save & Send</button>
      </div>
    </Form>
  );
}

const Form = styled.form`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  padding: 24px 22px 0px;
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

      & > input,
      select {
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

  & > .bill-group {
    display: flex;
    flex-direction: column;
    gap: 25px;

    & .country-flex-box {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    & .city-post-code-group {
      display: flex;
      gap: 23px;
      justify-content: space-between;
      align-items: center;

      & input {
        width: 100%;
      }
    }
  }

  & #scnd-bill {
    margin-top: 41px;
  }

  & .invoice-date-description {
    margin-top: 41px;
    display: flex;
    flex-direction: column;
    gap: 25px;

    & > .invoice-payment-grp {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }
  }

  & .item-list {
    margin-top: 69px;
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 18px;
      font-weight: 700;
      line-height: 32px;
      letter-spacing: -0.375px;
      text-align: left;
      color: rgba(119, 127, 152, 1);
    }

    & > button {
      background-color: ${(props) => props.theme.addButtonAndInputBackground};
      padding: 18px 107px;
      border-radius: 30px;
      color: ${(props) => props.theme.labelColor};
      font-size: 15px;
      font-weight: 700;
      line-height: 15px;
      letter-spacing: -0.25px;
      text-align: center;
      margin-top: 15px;
    }
  }

  & .item-inactive {
    display: flex;
    align-items: center;
    /* gap: 60px; */
    margin-top: 22px;
    justify-content: space-between;

    & p,
    span {
      font-size: 13px;
      font-weight: 500;
      line-height: 15px;
      letter-spacing: -0.10000000149011612px;
      text-align: left;
      color: ${(props) => props.theme.labelColor};
    }

    & > .item-inactive-flex {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

  & .submit-group {
    display: flex;
    gap: 7px;
    justify-content: space-around;
    padding: 21px 24px;
    margin-top: 88px;

    /* background-color: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.0001) 0%,
      rgba(0, 0, 0, 0.1) 100%
    ); */

    box-shadow: ${(props) => props.theme.shadow};
  }
`;
