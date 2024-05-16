import { useContext, useState } from "react";
import { invoiceContext } from "../../App";
import Heading from "./components/Heading";
import Main from "./components/Main";

export default function Home() {
  const [filteredData, setFilteredData] = useState({});
  return (
    <>
      <Heading />
      <Main />
    </>
  );
}
