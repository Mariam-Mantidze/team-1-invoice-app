import { useContext, useState, useEffect } from "react";
import { invoiceContext } from "../../App";
import { useParams, Link } from "react-router-dom";
import Address from "./Components/Address";
import InvoiceDates from "./Components/InvoiceDates";
import InvoiceItem from "./Components/InvoiceItem";
import DeleteButton from "./Components/DeleteButton";
import ConfirmDeletion from "./Components/ConfirmDeletion";
import GoBack from "../../shared-components/GoBack";

export default function SingleInvoice() {
  // find id of current invoice
  const { id } = useParams();
  // get data from useContext
  const { invoiceData, setInvoiceData } = useContext(invoiceContext);

  // find single invoice with corresponding id
  const invoice = invoiceData.find((invoice) => invoice.id === id);

  const [statusColor, setStatusColor] = useState("#373B53");
  const [showDelete, setShowDelete] = useState(false);

  const handleStatusColor = () => {
    if (invoice.status === "pending") {
      setStatusColor("#FF8F00");
    } else if (invoice.status === "paid") {
      setStatusColor("#33D69F");
    } else {
      return;
    }
  };

  const markAsPaid = () => {
    const updatedInvoice = { ...invoice, status: "paid" };
    const updatedInvoiceData = invoiceData.map((inv) =>
      inv.id === id ? updatedInvoice : inv
    );
    setInvoiceData(updatedInvoiceData);
    handleStatusColor();
  };

  const deleteInvoice = () => {
    const updatedInvoiceData = invoiceData.filter((inv) => inv.id !== id);
    setInvoiceData(updatedInvoiceData);
  };

  useEffect(() => {
    handleStatusColor();
  }, [invoice.status]);

  return (
    <>
      <ConfirmDeletion
        id={invoice.id}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
      />
      <div
        className={`min-h-screen lg:w-[60%] lg:ml-[200px] ${
          showDelete ? "opacity-[0.03]" : ""
        }`}
      >
        <div className="flex flex-col p-6 bg-[#F8F8FB] gap-8">
          <GoBack />

          <div className="flex flex-col gap-4">
            <div className="flex w-[100%] justify-between bg-[#FFF] shadow-sm rounded-md">
              <div className="flex p-6 justify-between items-center w-[100%] md:gap-6 md:w-auto">
                <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight">
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

              <div className="hidden p-6 justify-between bg-[#FFF] md:flex md:gap-6">
                <button className="rounded-full bg-[#F9FAFE] py-4 px-6 text-[#7E88C3] text-sm font-bold leading-tight tracking-tight hover:bg-[#DFE3FA]">
                  Edit
                </button>
                <DeleteButton onClick={() => setShowDelete(true)} />
                <button
                  onClick={markAsPaid}
                  className="rounded-full bg-[#7C5DFA] py-4 px-6 text-[#FFF] text-sm font-bold leading-tight tracking-tight hover:bg-[#9277FF]"
                >
                  {invoice.status !== "paid" ? "Mark As Paid" : "Already Paid"}
                </button>
              </div>
            </div>

            <div className="flex flex-col p-6 bg-[#FFF] gap-8 rounded-md shadow-sm">
              <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                <div>
                  <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight">
                    #
                    <span className="text-[#0C0E16] text-lg font-bold leading-5 tracking-tight">
                      {invoice.id}
                    </span>
                  </p>
                  <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight">
                    {invoice.description}
                  </p>
                </div>

                <Address owner={invoice.senderAddress} text={"right"} />
              </div>

              <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                <div className="flex justify-between md:w-[50%]">
                  <div className="flex flex-col gap-8">
                    <InvoiceDates
                      name="Invoice Date"
                      date={invoice.createdAt}
                    />
                    <InvoiceDates
                      name="Payment Due"
                      date={invoice.paymentDue}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight">
                      Bill To
                    </p>
                    <p className="text-[#0C0E16] text-lg font-bold leading-5 tracking-tight">
                      {invoice.clientName}
                    </p>
                    <Address owner={invoice.clientAddress} text={"left"} />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight">
                    Sent To
                  </p>
                  <p className="text-[#0C0E16] text-lg font-bold leading-5 tracking-tight">
                    {invoice.clientEmail}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-col p-6 gap-6 rounded-md bg-[#F9FAFE]">
                  <div className="hidden md:flex justify-between">
                    <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight">
                      Item Name
                    </p>
                    <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight">
                      QTY.
                    </p>
                    <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight">
                      Price
                    </p>
                    <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight">
                      Total
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    {invoice.items.map((item, num) => {
                      return (
                        <InvoiceItem
                          key={num}
                          name={item.name}
                          quantity={item.quantity}
                          price={item.price}
                          total={item.total}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="flex rounded-b-lg bg-[#373B53] justify-between items-center p-6">
                  <p className="text-[#FFF] text-sm font-medium leading-5 tracking-tight">
                    Grand Total
                  </p>
                  <p className="text-[#FFF] text-2xl font-bold leading-8 tracking-tighter">
                    £ {invoice.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex p-6 justify-between bg-[#FFF] md:hidden">
          <button className="rounded-full bg-[#F9FAFE] py-4 px-6 text-indigo-300 text-sm font-bold leading-tight tracking-tight hover:bg-[#DFE3FA]">
            Edit
          </button>
          <DeleteButton onClick={() => setShowDelete(true)} />
          <button
            onClick={markAsPaid}
            className="rounded-full bg-[#7C5DFA] py-4 px-6 text-[#FFF] text-sm font-bold leading-tight tracking-tight hover:bg-[#9277FF]"
          >
            {invoice.status !== "paid" ? "Mark As Paid" : "Already Paid"}
          </button>
        </div>
      </div>
    </>
  );
}
