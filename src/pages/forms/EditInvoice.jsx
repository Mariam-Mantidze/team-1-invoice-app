import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { invoiceContext } from "../../App";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GoBack from "../../shared-components/GoBack";
import uuid from "react-uuid";
import SuccessModal from "./components/SuccessModal";
import DiscardModal from "./components/DiscardModal";
import { schema } from "./Schema";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function editInvoice() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [discardDialogue, setDiscardDialogue] = useState(false);
  const [items, setItems] = useState([]);

  const {
    invoiceData,
    setInvoiceData,
    navigate,
    isMobile,
    handleCloseOverlay,
  } = useContext(invoiceContext);

  const { id } = useParams();

  // find current invoice id
  const currInvoiceId = id;

  // find current invoice
  const currentInvoice = invoiceData.find(
    (invoice) => invoice.id === currInvoiceId
  );

  useEffect(() => {
    if (currentInvoice.items) {
      const itemsWithIds = currentInvoice.items.map((item) => ({
        ...item,
        id: item.id || uuid(), // Generate ID if not present
      }));
      setItems(itemsWithIds);
    }
  }, [currentInvoice]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clientAddress: {
        city: currentInvoice.clientAddress.city,
        country: currentInvoice.clientAddress.country,
        postCode: currentInvoice.clientAddress.postCode,
        street: currentInvoice.clientAddress.street,
      },
      clientEmail: currentInvoice.clientEmail,
      clientName: currentInvoice.clientName,
      createdAt: currentInvoice.createdAt,
      description: currentInvoice.description,
      id: currentInvoice.id,

      items:
        currentInvoice.items.map((item) => ({
          ...item,
          id: item.id || uuid(),
        })) || [],
      paymentDue: currentInvoice.paymentDue,
      senderAddress: {
        city: currentInvoice.senderAddress.city,
        country: currentInvoice.senderAddress.country,
        postCode: currentInvoice.senderAddress.postCode,
        street: currentInvoice.senderAddress.street,
      },
      status: currentInvoice.status,
      total: currentInvoice.total,
    },
  });

  // watch entire items array
  const itemsValues = watch("items");

  // function to add items
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

  // function to delete item
  const handleDeleteItemClick = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    const updatedValues = itemsValues.filter((item) => item.id === id);

    reset({
      items: updatedValues,
    });

    setItems(updatedItems);
  };

  // find createdDate
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  // function to send edited data on server
  const editInvoice = async (finalData) => {
    try {
      const response = await fetch(
        `https://invoice-api-team-1.onrender.com/api/invoice/${finalData.id}`,
        {
          method: "PATCH", //
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to edit invoice: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error editing invoice:", error);
    }
  };

  // function to submit the entire form
  const onSubmit = async (data, event) => {
    event.preventDefault(); // prevent default form submission

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

    // actions to format payment terms
    const inputString = data.paymentTerms;
    const regex = /\d+/;
    const match = inputString.match(regex);
    const numberOfDays = match ? parseInt(match[0], 10) : null;

    const finalData = {
      ...data,
      createdAt: formattedDate,
      items: itemsWithTotals,
      // id: generateCustomID(), // change
      total: computedTotal,
      status,
      paymentTerms: numberOfDays,
    };

    const updatedInvoiceData = invoiceData.map((invoice) =>
      invoice.id === currentInvoice.id ? finalData : invoice
    );

    setInvoiceData(updatedInvoiceData);
    await editInvoice(finalData);

    setModalIsOpen(true);

    setTimeout(() => {
      setModalIsOpen(false);
      handleCloseOverlay();
      navigate("/");
    }, 3000);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMobile ? <GoBack /> : ""}

      <h1>Edit #{currentInvoice.id}</h1>
      <h3>Bill From</h3>

      <div className="bill-group">
        <div className="label-box">
          <label
            className={errors.senderAddress?.street ? "error-label" : ""}
            htmlFor="sender-street">
            Street Address
            <input
              className={errors.senderAddress?.street ? "error-input" : ""}
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
              <label
                className={errors.senderAddress?.city ? "error-label" : ""}
                htmlFor="sender-city">
                City
                <input
                  className={errors.senderAddress?.city ? "error-input" : ""}
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
              <label
                className={errors.senderAddress?.postCode ? "error-label" : ""}
                htmlFor="sender-post-code">
                Post Code
                <input
                  className={
                    errors.senderAddress?.postCode ? "error-input" : ""
                  }
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
            <label
              className={errors.senderAddress?.country ? "error-label" : ""}
              htmlFor="sender-country">
              Country
              <input
                className={errors.senderAddress?.country ? "error-input" : ""}
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
          <label
            className={errors.clientName ? "error-label" : ""}
            htmlFor="client-name">
            Client's Name
            <input
              className={errors.clientName ? "error-input" : ""}
              type="text"
              id="client-name"
              {...register("clientName")}
            />
            {errors.clientName ? (
              <span className="error-message">{errors.clientName.message}</span>
            ) : null}
          </label>
        </div>

        <div className="label-box">
          <label
            className={errors.clientEmail ? "error-label" : ""}
            htmlFor="client-email">
            Client's Email
            <input
              className={errors.clientEmail ? "error-input" : ""}
              type="text"
              id="client-email"
              {...register("clientEmail")}
            />
            {errors.clientEmail ? (
              <span className="error-message">
                {errors.clientEmail.message}
              </span>
            ) : null}
          </label>
        </div>

        <div className="label-box">
          <label
            className={errors.clientAddress?.street ? "error-label" : ""}
            htmlFor="client-street">
            Street Address
            <input
              className={errors.clientAddress?.street ? "error-input" : ""}
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
              <label
                className={errors.clientAddress?.city ? "error-label" : ""}
                htmlFor="client-city">
                City
                <input
                  className={errors.clientAddress?.city ? "error-input" : ""}
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
              <label
                className={errors.clientAddress?.postCode ? "error-label" : ""}
                htmlFor="client-post-code">
                Post Code
                <input
                  className={
                    errors.clientAddress?.postCode ? "error-input" : ""
                  }
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
            <label
              className={errors.clientAddress?.country ? "error-label" : ""}
              htmlFor="client-country">
              Country
              <input
                className={errors.clientAddress?.country ? "error-input" : ""}
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
            <label
              className={errors.paymentDue ? "error-label" : ""}
              htmlFor="invoice-date">
              Invoice Date
              <input
                className={errors.paymentDue ? "error-input" : ""}
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
            <label
              className={errors.paymentTerms ? "error-label" : ""}
              htmlFor="payment-terms">
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
          <label
            className={errors.description ? "error-label" : ""}
            htmlFor="project-description">
            Project Description
            <input
              className={errors.description ? "error-input" : ""}
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
                    <label
                      htmlFor={`name-${item.id}`}
                      className={
                        errors.items?.[index].name ? "error-label" : ""
                      }>
                      Item Name
                      <input
                        className={
                          errors.items?.[index].name ? "error-input" : ""
                        }
                        id={`name-${item.id}`}
                        type="text"
                        name="item-name"
                        {...register(`items.${index}.name`)}
                      />
                    </label>
                  </div>

                  <div className="qty-delete-box">
                    <div className="qty-price-box">
                      <div className="label-box">
                        <label
                          className={
                            errors.items?.[index].quantity ? "error-label" : ""
                          }
                          htmlFor={`qty-${item.id}`}>
                          Qty.
                          <input
                            className={
                              errors.items?.[index].quantity
                                ? "error-input qty"
                                : "qty"
                            }
                            type="number"
                            id={`qty-${item.id}`}
                            {...register(`items.${index}.quantity`)}
                          />
                        </label>
                      </div>
                      <div className="label-box">
                        <label
                          className={
                            errors.items?.[index].price ? "error-label" : ""
                          }
                          htmlFor={`price-${item.id}`}>
                          Price
                          <input
                            className={
                              errors.items?.[index].price
                                ? "error-input price"
                                : "price"
                            }
                            type="number"
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
        <DiscardModal setDiscardDialogue={setDiscardDialogue} />
      )}

      {modalIsOpen && <SuccessModal setModalIsOpen={setModalIsOpen} />}

      {modalIsOpen && <ModalOverlay />}
      {discardDialogue && <ModalOverlay />}

      <div className="submit-group">
        <button
          type="button"
          name="submissionAction"
          value="discard"
          className="discard"
          onClick={() => setDiscardDialogue(true)}>
          Cancel
        </button>

        <button
          type="submit"
          name="submissionAction"
          value="saveAndSend"
          className="save save-send">
          Save Changes
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

  @media (min-width: 678px) {
    margin-right: auto;
    margin-left: auto;
  }

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

    & .error-input {
      border: 1px solid rgba(236, 87, 87, 1);
    }

    & > .error-label {
      color: rgba(236, 87, 87, 1);
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
      background-color: ${(props) =>
        props.theme.addButtonAndInputBackground.inactive};
      padding: 18px 107px;
      border-radius: 30px;
      color: ${(props) => props.theme.labelColor};
      font-size: 15px;
      font-weight: 700;
      line-height: 15px;
      letter-spacing: -0.25px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: ${(props) =>
          props.theme.addButtonAndInputBackground.active};
      }
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
      background-color: ${(props) => props.theme.discardButton.inactive};
      color: ${(props) => props.theme.labelColor};

      &:hover {
        background-color: ${(props) => props.theme.discardButton.active};
      }
    }

    & > .save {
      padding: 18px 16px;
    }
    & .save-draft {
      background-color: ${(props) =>
        props.theme.saveDraftButtonBackground.inactive};
      color: ${(props) => props.theme.saveDraftColor.inactive};

      &:hover {
        color: ${(props) => props.theme.saveDraftColor.active};
        background-color: ${(props) =>
          props.theme.saveDraftButtonBackground.active};
      }
    }

    & .save-send {
      background: rgba(124, 93, 250, 1);
      color: rgba(255, 255, 255, 1);

      &:hover {
        background: rgba(146, 119, 255, 1);
      }
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
