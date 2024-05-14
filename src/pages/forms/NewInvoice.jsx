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

const Form = styled.form``;
