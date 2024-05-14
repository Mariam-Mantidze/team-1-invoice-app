import styled from "styled-components";
import { useContext } from "react";
import { invoiceContext } from "../../App";

export default function NewInvoice() {
  const { invoiceData, setInvoiceData } = useContext(invoiceContext);

  // payment terms: net 30 days, 7 days, 1 day, 14 days

  return (
    <Form>
      <p>1</p>
      <input type="text" />
    </Form>
  );
}

const Form = styled.form``;
