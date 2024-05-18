import styled from "styled-components";
import { useContext, useState } from "react";
import { invoiceContext } from "../../App";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoBack from "../../shared-components/GoBack";
// import uuid from "react-uuid";

export default function NewInvoice() {
  const { invoiceData, setInvoiceData } = useContext(invoiceContext);

  const schema = yup.object({
    senderAddress: yup.object({
      street: yup.string().required("Can't be empty"),
      city: yup.string().required("Can't be empty"),
      postCode: yup.string().required("Can't be empty"),
      country: yup.string().required("Can't be empty"),
    }),
    clientAddress: yup.object({
      street: yup.string().required("Can't be empty"),
      city: yup.string().required("Can't be empty"),
      postCode: yup.string().required("Can't be empty"),
      country: yup.string().required("Can't be empty"),
    }),
    items: yup.array().of(
      yup.object({
        name: yup.string().required("Can't be empty"),
        quantity: yup.number().required("Can't be empty").positive(),
        price: yup.number().required("Can't be empty").positive(),
        total: yup.number().required("Can't be empty").positive(),
      })
    ),
    clientEmail: yup.string().required("Can't be empty"),
    clientName: yup.string().required("Can't be empty"),
    description: yup.string().required("Can't be empty"),
    createdAt: yup.string().required("Can't be empty"),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // payment terms: net 30 days, 7 days, 1 day, 14 days

  const [items, setItems] = useState([]);

  const handleAddItemClick = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuid(),
      name: "",
      quantity: "",
      price: "",
      total: "",
    };

    setItems([...items, newItem]);
  };

  const handleDeleteItemClick = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);

    setItems(updatedItems);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <GoBack />
      <h1>New Invoice</h1>
      <h3>Bill From</h3>

      <div className="bill-group">
        <div className="label-box">
          <label htmlFor="sender-street">
            Street Address
            <input
              type="text"
              id="sender-street"
              {...register("senderAddress.street")}
            />
            {errors.senderAddress?.street ? (
              <span className="error-message">
                {errors.senderAddress.street.message}
              </span>
            ) : null}
          </label>
        </div>

        <div className="country-flex-box">
          <div className="city-post-code-group">
            <div className="label-box">
              <label htmlFor="sender-city">
                City
                <input
                  type="text"
                  id="sender-city"
                  {...register("senderAddress.city")}
                />
                {errors.senderAddress?.city ? (
                  <span className="error-message">
                    {errors.senderAddress.city.message}
                  </span>
                ) : null}
              </label>
            </div>

            <div className="label-box">
              <label htmlFor="sender-post-code">
                Post Code
                <input
                  type="text"
                  id="sender-post-code"
                  {...register("senderAddress.postCode")}
                />
                {errors.senderAddress?.postCode ? (
                  <span className="error-message">
                    {errors.senderAddress.postCode.message}
                  </span>
                ) : null}
              </label>
            </div>
          </div>

          <div className="label-box">
            <label htmlFor="sender-country">
              Country
              <input
                type="text"
                id="sender-country"
                {...register("senderAddress.country")}
              />
              {errors.senderAddress?.country ? (
                <span className="error-message">
                  {errors.senderAddress.country.message}
                </span>
              ) : null}
            </label>
          </div>
        </div>
      </div>

      <h3 id="scnd-bill">Bill to</h3>

      <div className="bill-group">
        <div className="label-box">
          <label htmlFor="client-name">
            Client's Name
            <input type="text" id="client-name" {...register("clientName")} />
            {errors.clientName ? (
              <span className="error-message">{errors.clientName.message}</span>
            ) : null}
          </label>
        </div>

        <div className="label-box">
          <label htmlFor="client-email">
            Client's Email
            <input type="text" id="client-email" {...register("clientEmail")} />
            {errors.clientEmail ? (
              <span className="error-message">
                {errors.clientEmail.message}
              </span>
            ) : null}
          </label>
        </div>

        <div className="label-box">
          <label htmlFor="client-street">
            Street Address
            <input
              type="text"
              id="client-street"
              {...register("clientAddress.street")}
            />
            {errors.clientAddress?.street ? (
              <span className="error-message">
                {errors.clientAddress.street.message}
              </span>
            ) : null}
          </label>
        </div>

        <div className="country-flex-box">
          <div className="city-post-code-group">
            <div className="label-box">
              <label htmlFor="client-city">
                City
                <input
                  type="text"
                  id="client-city"
                  {...register("clientAddress.city")}
                />
                {errors.clientAddress?.city ? (
                  <span className="error-message">
                    {errors.clientAddress.city.message}
                  </span>
                ) : null}
              </label>
            </div>

            <div className="label-box">
              <label htmlFor="client-post-code">
                Post Code
                <input
                  type="text"
                  id="client-post-code"
                  {...register("clientAddress.postCode")}
                />
                {errors.clientAddress?.postCode ? (
                  <span className="error-message">
                    {errors.clientAddress.postCode.message}
                  </span>
                ) : null}
              </label>
            </div>
          </div>

          <div className="label-box">
            <label htmlFor="client-country">
              Country
              <input
                type="text"
                id="client-country"
                {...register("clientAddress.country")}
              />
              {errors.clientAddress?.country ? (
                <span className="error-message">
                  {errors.clientAddress.country.message}
                </span>
              ) : null}
            </label>
          </div>
        </div>
      </div>

      <div className="invoice-date-description">
        <div className="invoice-payment-grp">
          <div className="label-box">
            <label htmlFor="invoice-date">
              Invoice Date
              <input id="invoice-date" type="date" {...register("createdAt")} />
              {errors.createdAt ? (
                <span className="error-message">
                  {errors.createdAt.message}
                </span>
              ) : null}
            </label>
          </div>

          <div className="label-box">
            <label htmlFor="payment-terms">
              Payment Terms
              <select id="payment-terms" {...register("paymentDue")}>
                <option value="net 30 days">Net 30 Days</option>
                <option value="net 14 days">Net 14 Days</option>
                <option value="net 7 days">Net 7 Days</option>
                <option value="net 1 day">Net 1 Day</option>
              </select>
              {errors.paymentDue ? (
                <span className="error-message">
                  {errors.paymentDue.message}
                </span>
              ) : null}
            </label>
          </div>
        </div>

        <div className="label-box">
          <label htmlFor="project-description">
            Project Description
            <input
              type="text"
              id="project-description"
              {...register("description")}
            />
            {errors.description ? (
              <span className="error-message">
                {errors.description.message}
              </span>
            ) : null}
          </label>
        </div>
      </div>

      <div className="item-list">
        <h2>Item List</h2>

        <div className="item-active-container">
          {items.length > 0 ? (
            items.map((item, index) => {
              return (
                <div key={item.id} className="item-active">
                  <div className="active-container"></div>
                  <div className="label-box">
                    <label>
                      Item Name
                      <input
                        type="text"
                        name="item-name"
                        {...register(`items.${index}.name`)}
                      />
                    </label>
                  </div>

                  <div className="qty-delete-box">
                    <div className="qty-price-box">
                      <div className="label-box">
                        <label htmlFor={`qty-${item.id}`}>
                          Qty.
                          <input
                            className="qty"
                            id={`qty-${item.id}`}
                            {...register(`items.${index}.quantity`)}
                          />
                        </label>
                      </div>
                      <div className="label-box">
                        <label htmlFor={`price-${item.id}`}>
                          Price
                          <input
                            className="price"
                            id={`price-${item.id}`}
                            {...register(`items.${index}.price`)}
                          />
                        </label>
                      </div>
                      <div className="label-box total-box">
                        <div className="total-flex">
                          <p>Total</p>
                          <span>200.00</span>
                        </div>
                      </div>
                    </div>
                    <img
                      onClick={() => handleDeleteItemClick(item.id)}
                      src="/assets/icon-delete.svg"
                      alt="delete icon"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="item-inactive">
              <p className="item-name">Item Name</p>

              <div className="item-inactive-flex">
                <span>Qty.</span>
                <span>Price</span>
              </div>

              <p>Total</p>
            </div>
          )}
        </div>

        <button
          type="button"
          name="action"
          value="addItem"
          style={{ marginTop: items.length > 0 ? "65px" : "22px" }}
          onClick={handleAddItemClick}
        >
          + Add New Item
        </button>
      </div>

      {errors.items?.length > 0 && (
        <p className="error-message generic-message">
          - All fields must be added
        </p>
      )}

      <div className="submit-group">
        <button type="submit" name="action" value="discard" className="discard">
          Discard
        </button>
        <button
          type="submit"
          name="action"
          value="saveDraft"
          className="save save-draft"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          name="action"
          value="submitPending"
          className="save save-send"
        >
          Save & Send
        </button>
      </div>
    </Form>
  );
}

const Form = styled.form`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  padding-top: 24px;
  background-color: ${(props) => props.theme.formsBackground};

  & > h1 {
    color: ${(props) => props.theme.textColor};
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -0.5px;
    margin-top: 25px;
    margin-bottom: 22px;
    padding: 0 22px 0;
  }

  & > h3 {
    color: rgba(124, 93, 250, 1);
    font-size: 15px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: -0.25px;
    margin-bottom: 24px;
    padding: 0 22px 0;
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
      position: relative;

      & .error-message {
        position: absolute;
        right: 0;
        top: 5px;
        color: rgba(236, 87, 87, 1);
        font-weight: 600;
        line-height: 5px;
        letter-spacing: -0.2083333283662796px;
        text-align: left;
        font-size: 9px;
      }

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
    padding: 0 22px 0;
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
    padding: 0 22px 0;

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
    padding: 0 22px 0;

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
      cursor: pointer;
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
    box-shadow: ${(props) => props.theme.shadow};

    & button {
      cursor: pointer;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 700;
      line-height: 15px;
      letter-spacing: -0.25px;
    }

    & > .discard {
      padding: 18px 19px 15px 18px;
      background-color: ${(props) => props.theme.addButtonAndInputBackground};
      color: ${(props) => props.theme.labelColor};
    }

    & > .save {
      padding: 18px 16px;
    }
    & .save-draft {
      background-color: ${(props) => props.theme.saveDraftButtonBackground};
      color: ${(props) => props.theme.labelColor};
    }

    & .save-send {
      background: rgba(124, 93, 250, 1);
      color: rgba(255, 255, 255, 1);
    }
  }

  & .item-active-container {
    display: flex;
    flex-direction: column;
    gap: 49px;
  }

  & .item-active {
    margin-top: 22px;
  }

  & .qty-delete-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    & > img {
      align-self: flex-end;
      cursor: pointer;
      margin-bottom: 18px;
    }
  }

  & .qty-price-box {
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
    /* align-items: center; */
    gap: 16px;
    margin-top: 25px;

    & .qty {
      width: 64px;
    }

    & .price {
      width: 100px;
    }

    & .total-box {
      display: flex;
      gap: 64px;
    }

    & .total-flex {
      display: flex;
      flex-direction: column;
      gap: 27px;

      & > p {
        color: ${(props) => props.theme.labelColor};
        font-size: 13px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: -0.10000000149011612px;
      }

      & span {
        font-size: 15px;
        font-weight: 700;
        line-height: 15px;
        letter-spacing: -0.25px;
        text-align: left;
        color: rgba(136, 142, 176, 1);
      }
    }
  }
  & .generic-message {
    color: rgba(236, 87, 87, 1);
    font-weight: 600;
    line-height: 5px;
    letter-spacing: -0.2083333283662796px;
    text-align: left;
    font-size: 9px;
    margin-left: 22px;
    margin-top: 25px;
  }
`;
