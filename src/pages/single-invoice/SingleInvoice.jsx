import { useContext } from "react";
import { invoiceContext } from "../../App";
import { useParams } from "react-router-dom";
import GoBack from "../../GoBack";

export default function SingleInvoice() {
  // find id of current invoice
  const { id } = useParams();
  // get data from useContext
  const { invoiceData, setInvoiceData } = useContext(invoiceContext);

  // find single invoice with corresponding id
  const invoice = invoiceData.find((invoice) => invoice.id === id);

  return (
    <>
      <p>{invoice.id}</p>
      <GoBack />
    </>
  );
}
