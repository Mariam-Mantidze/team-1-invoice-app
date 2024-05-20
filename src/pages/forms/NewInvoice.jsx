import styled from "styled-components";
import { useContext, useState } from "react";
import { invoiceContext } from "../../App";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoBack from "../../shared-components/GoBack";
import uuid from "react-uuid";
import Modal from "react-modal";

import ReactInputMask from "react-input-mask";

Modal.setAppElement("#root");

export default function NewInvoice() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [discardDialogue, setDiscardDialogue] = useState(false);

  const { invoiceData, setInvoiceData, navigate } = useContext(invoiceContext);

  // Function to generate a custom ID using UUID
  function generateCustomID() {
    const randomId = uuid();
    // Extract the first two characters as letters
    const letters = randomId.substring(0, 2).toUpperCase();
    // Extract the first four numbers from the uuid
    const digits = randomId.replace(/\D/g, "").substring(0, 4);

    // Combine letters and digits to form the custom ID
    const customID = `${letters}${digits}`;

    return customID;
  }

  const schema = yup.object({
    senderAddress: yup.object({
      street: yup
        .string()
        .required("Can't be empty")
        .max(20, "max limit reached")
        .min(5, "min 5 characters")
        .test("sender street check", "incorrect address", (value) =>
          value.includes("")
        ),
      city: yup
        .string()
        .required("Can't be empty")
        .max(20, "max limit reached")
        .min(3, "min 3 characters"),
      postCode: yup
        .string()
        .required("Can't be empty")
        .max(8, "max limit reached")
        .min(4, "min 3 characters"),
      country: yup
        .string()
        .required("Can't be empty")
        .max(15, "max limit reached")
        .min(3, "min 3 characters"),
    }),
    clientAddress: yup.object({
      street: yup
        .string()
        .required("Can't be empty")
        .max(20, "max limit reached")
        .min(5, "min 5 characters")
        .test("sender street check", "incorrect address", (value) =>
          value.includes("")
        ),
      city: yup
        .string()
        .required("Can't be empty")
        .max(20, "max limit reached")
        .min(3, "min 3 characters"),
      postCode: yup
        .string()
        .required("Can't be empty")
        .max(8, "max limit reached")
        .min(4, "min 3 characters"),
      country: yup
        .string()
        .required("Can't be empty")
        .max(15, "max limit reached")
        .min(3, "min 3 characters"),
    }),
    items: yup.array().of(
      yup.object({
        name: yup
          .string()
          .required("Can't be empty")
          .max(15, "max limit reached")
          .min(3, "min 3 characters"),
        quantity: yup
          .number()
          .required("Can't be empty")
          .positive("invalid value"),
        // .max(5, "max limit reached"),
        price: yup
          .number()
          .required("Can't be empty")
          .positive("invalid value"),
        // .max(5, "max limit reached"),
        // total: yup
        //   .number()
        //   .required("Can't be empty")
        //   .positive("invalid value"),
      })
    ),
    clientEmail: yup.string().required("Can't be empty"),
    clientName: yup.string().required("Can't be empty"),
    description: yup.string().required("Can't be empty"),
    // createdAt: yup.string().required("Can't be empty"),
    paymentTerms: yup.string().required("Can't be empty"),
    paymentDue: yup.string().required("Can't be empty"),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      items: [{ name: "", quantity: "", price: "", total: 0 }],
    },
  });

  // payment terms: net 30 days, 7 days, 1 day, 14 days

  const [items, setItems] = useState([]);

  const itemsValues = watch("items");

  // console.log(itemsValues);
  // console.log(errors);

  const handleAddItemClick = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuid(),
      name: "",
      quantity: 0,
      price: 0,
      total: 0,
    };

    setItems([...items, newItem]);
  };

  const handleDeleteItemClick = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);

    setItems(updatedItems);
  };

  // find createdDate
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const onSubmit = (data, event) => {
    event.preventDefault(); // Prevent default form submission

    // find which button was clicked
    const submitter = event.nativeEvent.submitter;
    const submissionAction = submitter ? submitter.value : null;

    // getting status based on which item was clicked
    const status = submissionAction === "saveAndSend" ? "pending" : "draft";

    //calculating each item totals and setting it
    const itemsWithTotals = itemsValues.map((item) => ({
      ...item,
      total: ((item.quantity || 0) * (item.price || 0)).toFixed(2),
      price: (+item.price || 0).toFixed(2),
      quantity: (+item.quantity || 0).toFixed(2),
    }));

    // get all items sum / total
    const computedTotal = itemsValues
      .reduce(
        (acc, item) => acc + parseFloat(item.quantity) * parseFloat(item.price),
        0
      )
      .toFixed(2);

    const inputString = data.paymentTerms;
    const regex = /\d+/;
    const match = inputString.match(regex);
    const numberOfDays = match ? parseInt(match[0], 10) : null;

    const finalData = {
      ...data,
      createdAt: formattedDate,
      items: itemsWithTotals,
      id: generateCustomID(),
      total: computedTotal,
      status: status,
      paymentTerms: numberOfDays,
    };

    setInvoiceData([...invoiceData, finalData]);

    // console.log(invoiceData);

    // Open the modal
    setModalIsOpen(true);

    // Close the modal and navigate back to the main page after 3 seconds
    setTimeout(() => {
      setModalIsOpen(false);
      navigate("/");
    }, 3000);
  };

  const handleDiscard = () => {
    navigate(-1);
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
              <input
                id="invoice-date"
                type="date"
                {...register("paymentDue")}
              />
              {errors.paymentDue ? (
                <span className="error-message">
                  {errors.paymentDue.message}
                </span>
              ) : null}
            </label>
          </div>

          <div className="label-box">
            <label htmlFor="payment-terms">
              Payment Terms
              <select id="payment-terms" {...register("paymentTerms")}>
                <option value="net 30 days">Net 30 Days</option>
                <option value="net 14 days">Net 14 Days</option>
                <option value="net 7 days">Net 7 Days</option>
                <option value="net 1 day">Net 1 Day</option>
              </select>
              {errors.paymentTerms ? (
                <span className="error-message">
                  {errors.paymentTerms.message}
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
              const total =
                (
                  itemsValues[index]?.quantity * itemsValues[index]?.price
                ).toFixed(2) || "0.00";

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
                            type="number"
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
                            type="number"
                            className="price"
                            id={`price-${item.id}`}
                            {...register(`items.${index}.price`)}
                          />
                        </label>
                      </div>
                      <div className="label-box total-box">
                        <div className="total-flex">
                          <p>Total</p>
                          <TotalSpan total={total}>{total}</TotalSpan>
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

      {discardDialogue && (
        <DiscardDialogue>
          <h2>Confirm Discarding</h2>
          <p>Are you sure you want to discard the form?</p>
          <div className="button-flex">
            <button
              onClick={() => setDiscardDialogue(false)}
              className="cancel">
              Cancel
            </button>
            <button onClick={handleDiscard} className="discard">
              Discard
            </button>
          </div>
        </DiscardDialogue>
      )}

      {discardDialogue && <DiscardOverlay />}

      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        overlayElement={(props, contentElement) => (
          <ModalOverlay>{contentElement}</ModalOverlay>
        )}
        contentElement={(props, children) => (
          <ModalContent>{children}</ModalContent>
        )}>
        <h2>Success!</h2>
        <p>Your invoice has been sent successfully.</p>
        <CloseButton onClick={() => setModalIsOpen(false)}>×</CloseButton>
      </StyledModal>

      <div className="submit-group">
        <button
          type="submit"
          name="submissionAction"
          value="discard"
          className="discard"
          onClick={() => setDiscardDialogue(true)}>
          Discard
        </button>
        <button
          type="submit"
          name="submissionAction"
          value="saveAsDraft"
          className="save save-draft">
          Save as Draft
        </button>
        <button
          type="submit"
          name="submissionAction"
          value="saveAndSend"
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
        background-color: ${(props) => props.theme.inputBackground};
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
    background-color: ${(props) => props.theme.inputBackground};

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

const TotalSpan = styled.span`
  color: ${(props) => {
    return props.total > 0
      ? props.theme.totalColor.active
      : props.theme.totalColor.inactive;
  }};
  font-size: 15px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: -0.25px;
  text-align: left;
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.inputBackground};
  padding: 50px;
  border-radius: 8px;
  /* width: 400px; */
  /* text-align: center; */
  color: ${(props) => props.theme.textColor};
  position: relative;

  & > p {
    font-size: 13px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.10000000149011612px;
    text-align: left;
    margin-top: 20px;
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
    background: ${(props) => props.theme.cancelButton};
  }

  & .discard {
    background: rgba(236, 87, 87, 1);
  }
`;

const DiscardOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
