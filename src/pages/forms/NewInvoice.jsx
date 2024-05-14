import styled from "styled-components";
import { useContext } from "react";
import { invoiceContext } from "../../App";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
      <div className="go-back">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.342.886L2.114 5.114l4.228 4.228"
            stroke="#9277FF"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <p>Go Back</p>
      </div>
      <h1>New Invoice</h1>
      <h3>Bill From</h3>

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

      <h3>Bill to</h3>
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
    </Form>
  );
}

const Form = styled.form`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  padding: 24px 22px;
  background-color: ${(props) => props.theme.formsBackground};

  & > .go-back {
    display: flex;
    align-items: center;
    gap: 23px;
    margin-top: 33px;

    & > p {
      color: ${(props) => props.theme.textColor};
      font-size: 15px;
      font-weight: 700;
      line-height: 15px;
      letter-spacing: -0.25px;
    }
  }

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
    }
  }
`;
