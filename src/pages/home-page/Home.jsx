import { useContext, useState } from "react";
import { invoiceContext } from "../../App";
import Heading from "./components/Heading";

export default function Home() {
  const [filteredData, setFilteredData] = useState({});
  return (
    <>
      <Heading />
    </>
  );
}
