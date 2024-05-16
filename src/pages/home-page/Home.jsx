import { useContext, useState } from "react";
import { invoiceContext } from "../../App";
import Heading from "./components/Heading";
// import Maininvoices from "./components/Maininvoices";

export default function Home() {
  const [filteredData, setFilteredData] = useState({});
  return (
    <>
      <Heading />
      {/* <Maininvoices /> */}
    </>
  );
}
