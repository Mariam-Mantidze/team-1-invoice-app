import { createContext, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import data from "./data.json";
import { useScreenType } from "./window-width/WindowWidth";
import Home from "./pages/home-page/Home";
import SingleInvoice from "./pages/single-invoice/SingleInvoice";
import NewInvoice from "./pages/forms/NewInvoice";
import EditInvoice from "./pages/forms/EditInvoice";
import Header from "./shared-components/Header";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/Themes";

// creating context
export const invoiceContext = createContext({});

function App() {
  // get data for storing in local storage
  const storedData = JSON.parse(localStorage.getItem("data"));

  const storedMode = JSON.parse(localStorage.getItem("darkMode")) || false;


  // set stored data in useState
  const [invoiceData, setInvoiceData] = useState(storedData || data);

  // useState for setting themes
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = JSON.parse(localStorage.getItem("darkMode"));
    return storedMode || false;
  });

  // const toggleDarkMode = () => {
  //   document.body.classList.toggle("dark");
  // };

  // store data in local storage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(invoiceData));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [invoiceData, darkMode]);

  // detect screen size for conditional rendering
  const { isMobile, isTablet, isDesktop } = useScreenType();

  // navigate
  const navigate = useNavigate();

  return (
    <invoiceContext.Provider
      value={{
        invoiceData,
        setInvoiceData,
        navigate,
        isMobile,
        isTablet,
        isDesktop,
        darkMode,
      }}>
      <GlobalStyles />
      <ThemeProvider theme={darkMode == false ? lightTheme : darkTheme}>
        <div
          className={`${
            darkMode ? "dark bg-[#141625] " : "bg-[#f8f8fb]"
          } min-h-screen lg:flex lg:justify-between`}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<SingleInvoice />} />
            <Route path="/new-invoice" element={<NewInvoice />} />
            <Route
              path="/invoices/:id/edit-invoice"
              element={<EditInvoice />}
            />
          </Routes>
        </div>
      </ThemeProvider>
    </invoiceContext.Provider>
  );
}

export default App;
