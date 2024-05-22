import { createContext, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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

  // get data

  async function getData() {
    try {
      const response = await fetch(
        "https://invoice-api-team-1.onrender.com/api/invoice/"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // set stored data in useState
  const [invoiceData, setInvoiceData] = useState(storedData || []);

  // state for managing form overlay
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // useState for setting themes
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = JSON.parse(localStorage.getItem("darkMode"));
    return storedMode || false;
  });

  useEffect(() => {
    getData()
      .then((data) => setInvoiceData(data))
      .catch((error) => console.error(error));
  }, []);

  // store data in local storage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(invoiceData));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [invoiceData, darkMode]);

  // detect screen size for conditional rendering
  const { isMobile, isTablet, isDesktop } = useScreenType();

  // navigate
  const navigate = useNavigate();

  const handleOpenOverlay = () => {
    setIsOverlayOpen(true);
    if (isMobile) {
      navigate("/new-invoice");
    }
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    if (isMobile) {
      navigate("/");
    }
  };

  // monitoring changes in isMobile and isOverlay states
  useEffect(() => {
    if (isOverlayOpen) {
      if (isMobile) {
        navigate("/new-invoice");
      } else {
        navigate("/");
      }
    }
  }, [isMobile, isOverlayOpen, navigate]);

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
        setIsOverlayOpen,
        isOverlayOpen,
        handleCloseOverlay,
        handleOpenOverlay,
      }}
    >
      <GlobalStyles />
      <ThemeProvider theme={darkMode == false ? lightTheme : darkTheme}>
        <div
          className={`${
            darkMode ? "dark bg-[#141625] " : "bg-[#f8f8fb]"
          } min-h-screen lg:flex lg:justify-between`}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<SingleInvoice />} />
            {isMobile ? (
              <Route path="/new-invoice" element={<NewInvoice />} />
            ) : (
              <Route path="/new-invoice" element={<Home />} />
            )}
            <Route path="/:id/edit-invoice" element={<EditInvoice />} />
            <Route path="/" element={<Navigate to="/" />} />{" "}
            {/* fallback route */}
          </Routes>
        </div>
      </ThemeProvider>
    </invoiceContext.Provider>
  );
}

export default App;
