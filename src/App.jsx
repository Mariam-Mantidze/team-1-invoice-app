import { createContext, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import data from "./data.json";
import Home from "./pages/home-page/Home";
import SingleInvoice from "./pages/single-invoice/SingleInvoice";
import NewInvoice from "./pages/forms/NewInvoice";
import EditInvoice from "./pages/forms/EditInvoice";

// creating context
export const invoiceContext = createContext({});

function App() {
  // get data for storing in local storage
  const storedData = JSON.parse(localStorage.getItem("invoiceData"));

  // set stored data in useState
  const [invoiceData, setInvoiceData] = useState(storedData || data);

  // store data in local storage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(invoiceData));
  }, [invoiceData]);

  return (
    <invoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<SingleInvoice />} />
        <Route path="/new-invoice" element={<NewInvoice />} />
        <Route path="/invoices/:id/edit-invoice" element={<EditInvoice />} />
      </Routes>
    </invoiceContext.Provider>
  );
}

export default App;
