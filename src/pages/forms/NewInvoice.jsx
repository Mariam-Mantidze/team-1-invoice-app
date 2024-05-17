import styled from "styled-components";
import { useContext, useState } from "react";
import { invoiceContext } from "../../App";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoBack from "../../shared-components/GoBack";
import uuid from "react-uuid";

export default function NewInvoice() {
  const { invoiceData, setInvoiceData } = useContext(invoiceContext);

  const schema = yup.object({});

  const {
    register,
    handleSubmit,
    watch,
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

  const onSubmit = (data, event) => {
    console.log("Form data:", data);
    console.log("Submit event:", event);
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
              {...register("sender-street")}
            />
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
                  {...register("sender-city")}
                />
              </label>
            </div>

            <div className="label-box">
              <label htmlFor="sender-post-code">
                Post Code
                <input
                  type="text"
                  id="sender-post-code"
                  {...register("sender-post-code")}
                />
              </label>
            </div>
          </div>

          <div className="label-box">
            <label htmlFor="sender-country">
              Country
              <input
                type="text"
                id="sender-country"
                {...register("sender-country")}
              />
            </label>
          </div>
        </div>
      </div>

      <h3 id="scnd-bill">Bill to</h3>

      <div className="bill-group">
        <div className="label-box">
          <label htmlFor="client-name">
            Client's Name
            <input type="text" id="client-name" {...register("client-name")} />
          </label>
        </div>

        <div className="label-box">
          <label htmlFor="client-email">
            Client's Email
            <input
              type="text"
              id="client-email"
              {...register("client-email")}
            />
          </label>
        </div>

        <div className="label-box">
          <label htmlFor="client-street">
            Street Address
            <input
              type="text"
              id="client-street"
              {...register("client-street")}
            />
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
                  {...register("client-city")}
                />
              </label>
            </div>

            <div className="label-box">
              <label htmlFor="client-post-code">
                Post Code
                <input
                  type="text"
                  id="client-post-code"
                  {...register("client-post-code")}
                />
              </label>
            </div>
          </div>

          <div className="label-box">
            <label htmlFor="client-country">
              Country
              <input
                type="text"
                id="client-country"
                {...register("client-country")}
              />
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
            </label>
          </div>

          <div className="label-box">
            <label htmlFor="payment-terms">
              Payment Terms
              <select id="payment-terms" {...register("paymentDue")} />
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
                        {...register(`items-name-${item.id}`)}
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
                            {...register(`quantity-${item.id}`)}
                          />
                        </label>
                      </div>
                      <div className="label-box">
                        <label htmlFor={`price-${item.id}`}>
                          Price
                          <input
                            className="price"
                            id={`price-${item.id}`}
                            {...register(`price-${item.id}`)}
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
          onClick={handleAddItemClick}>
          + Add New Item
        </button>
      </div>

      <div className="submit-group">
        <button type="submit" name="action" value="discard" className="discard">
          Discard
        </button>
        <button
          type="submit"
          name="action"
          value="saveDraft"
          className="save save-draft">
          Save as Draft
        </button>
        <button
          type="submit"
          name="action"
          value="submitPending"
          className="save save-send">
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
`;
