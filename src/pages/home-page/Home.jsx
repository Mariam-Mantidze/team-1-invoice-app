import { useState, useContext, useEffect } from "react";
import Heading from "./components/Heading";
import Main from "./components/Main";
import { invoiceContext } from "../../App";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState(false);

  const { invoiceData } = useContext(invoiceContext);

  const [checkedBoxes, setCheckedBoxes] = useState(() => {
    const savedState = JSON.parse(localStorage.getItem("checkedBoxes"));
    return savedState || { draft: true, pending: true, paid: true };
  });

  useEffect(() => {
    // firstly it filters only active statuses and next filters the given data acording to that statuses

    localStorage.setItem("checkedBoxes", JSON.stringify(checkedBoxes));
  }, [checkedBoxes]);

  const activeStatuses = Object.keys(checkedBoxes).filter(
    (key) => checkedBoxes[key] === true
  );

  const filteredData = invoiceData.filter((element) => {
    // console.log(element.status.name);

    const lower = element.status.name?.toLowerCase() || element.status.status;

    return activeStatuses.includes(lower);
  });

  useEffect(() => {}, [filteredData]);

  return (
    <div
      className={`flex flex-col items-center gap-8 md:gap-[55px] lg:gap-[64px] lg:mx-auto`}>
      <Heading
        filteredData={filteredData}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setCheckedBoxes={setCheckedBoxes}
        checkedBoxes={checkedBoxes}
      />
      <Main filteredData={filteredData} />
    </div>
  );
}
