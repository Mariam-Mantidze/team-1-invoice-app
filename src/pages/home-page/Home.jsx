import { Link } from "react-router-dom";
import { useContext } from "react";
import { invoiceContext } from "../../App";

export default function Home() {
  // get data from useContext
  const { invoiceData, setInvoiceData } = useContext(invoiceContext);

  return (
    <>
      {/* mapping data for example */}
      {invoiceData.map((invoice) => {
        return (
          <li style={{ border: "1px solid black" }} key={invoice.id}>
            <Link to={`/${invoice.id}`}>{invoice.id}</Link>
            <p>{invoice.status}</p>
            <p>{invoice.clientName}</p>
          </li>
        );
      })}
      <Link to={"/new-invoice"}>New</Link>
    </>
  );
}
