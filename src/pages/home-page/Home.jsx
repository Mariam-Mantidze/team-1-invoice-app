import { useState } from "react";
import Heading from "./components/Heading";
import Main from "./components/Main";

export default function Home() {
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  console.log(filteredData);

  return (
    <div
      className={`flex flex-col items-center gap-8 md:gap-[55px] lg:gap-[64px] lg:mx-auto`}>
      <Heading
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <Main filteredData={filteredData} />
    </div>
  );
}
