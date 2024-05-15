import { useContext, useState, useEffect } from "react";
import { invoiceContext } from "../../App";
import { useParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import Address from "../../components/SingleInvoice/Address";
import InvoiceDates from "../../components/SingleInvoice/InvoiceDates";

export default function SingleInvoice() {
  // find id of current invoice
  const { id } = useParams();
  // get data from useContext
  const { invoiceData, setInvoiceData } = useContext(invoiceContext);

  // find single invoice with corresponding id
  const invoice = invoiceData.find((invoice) => invoice.id === id);

  const [statusColor, setStatusColor] = useState("#373B53");

  const handleStatusColor = () => {
    if (invoice.status === "pending") {
      setStatusColor("#FF8F00");
    } else if (invoice.status === "paid") {
      setStatusColor("#33D69F");
    } else {
      return;
    }
  };

  useEffect(() => {
    handleStatusColor();
  }, [invoice.status]);

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      <GoBack />
      <div>
        <div className="flex p-6 justify-between items-center rounded-md shadow-sm bg-white">
          <p className="text-gray-400 text-sm font-medium leading-5 tracking-tight">
            Status
          </p>
          <div
            className="flex items-center gap-2 py-[12px] px-[18px] rounded-lg "
            style={{ backgroundColor: `${statusColor}57` }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: statusColor }}
            ></div>
            <p
              className="text-base font-semibold leading-4 tracking-tight"
              style={{ color: statusColor }}
            >
              {invoice.status}
            </p>
          </div>
        </div>

        <div>
          <div>
            <p>#{invoice.id}</p>
            <p>{invoice.description}</p>
          </div>

          <Address owner={invoice.senderAddress} />

          <div>
            <InvoiceDates name="Invoice Date" date={invoice.createdAt} />
            <InvoiceDates name="Payment Due" date={invoice.paymentDue} />
          </div>

          <div>
            <p>Bill To</p>
            <p>{invoice.clientsName}</p>
            <Address owner={invoice.clientAddress} />
          </div>

          <div>
            <p>Sent To</p>
            <p>{invoice.clientEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
