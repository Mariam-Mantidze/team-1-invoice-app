import { useContext, useState } from "react";
import { invoiceContext } from "../../App";
import Heading from "./components/Heading";
import Main from "./components/Main";

export default function Home() {
  const [filteredData, setFilteredData] = useState({});
  const [activeFilter, setActiveFilter] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8">
      <Heading
        setFilteredData={setFilteredData}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <Main />
    </div>
  );
}
