import { useContext, useState, useEffect, useRef } from "react";
import { invoiceContext } from "../../../App";
import Empty from "./Empty";

function Main(props) {
  const content = useContext(invoiceContext);

  // using useref and useEffect to implement correct date
  const dateRef = useRef([]);
  useEffect(() => {
    const dates = content.invoiceData.map((e) => {
      const datestr = e.paymentDue;
      const parts = datestr.split("-");
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      const month = date.toLocaleString("en-us", { month: "short" });
      const day = date.getDate();
      const year = date.getFullYear();
      const fulldate = `${day} ${month} ${year}`;
      return { payDue: fulldate };
    });
    dateRef.current = dates;
  }, [content.invoiceData]);

  console.log(props.filteredData[0].status);

  //   const fixedAmount = content.invoiceData.
  return (
    <main className={` flex flex-col items-center gap-4 mb-10`}>
      {props.filteredData.length > 0 ? (
        props.filteredData.map((e, index) => {
          return (
            <section
              key={e.id}
              onClick={() => content.navigate(`/${e.id}`)}
              className="w-[327px] md:w-[672px] lg:w-[730px] flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0 bg-white dark:bg-[#1e2139] rounded-[8px] shadow-invoice dark:shadow-darkInvoice pt-[25px] px-6 pb-[22px] md:py-4 lg:pl-8 hover:border hover:border-solid hover:border-[#7c5dfa] hover:cursor-pointer"
            >
              <div className="flex justify-between items-center md:gap-[40px] lg:gap-[48px]">
                <div className="md:w-[180px] lg:w-[195px] flex justify-between">
                  <h3 className="text-[15px] text-[#0c0e16] dark:text-[#fff] font-[700] tracking-[-0.25px] leading-[1]">
                    <span className="text-[#7e88c3]">#</span>
                    {e.id}
                  </h3>
                  <p className="text-[13px] text-[#7e88c3] dark:text-[#dfe3fa] font-[500] tracking-[-0.1px] leading-[1.15] hidden md:flex">
                    due{" "}
                    {dateRef.current[index]
                      ? dateRef.current[index].payDue
                      : ""}
                  </p>
                </div>
                <span className="text-[13px] text-[#858bb2] dark:text-[#fff] font-[500] tracking-[-0.1px] leading-[1.15] md:ml-[23px]">
                  {e.clientName}
                </span>
              </div>
              <div className="flex justify-between items-center md:gap-5">
                <div className="flex flex-col md:flex-row gap-[9px]">
                  <p className="text-[13px] text-[#7e88c3] font-[500] tracking-[-0.1px] leading-[1.15] md:hidden">
                    due{" "}
                    {dateRef.current[index]
                      ? dateRef.current[index].payDue
                      : ""}
                  </p>
                  <span className="text-[15px] text-[#0c0e16] dark:text-[#fff] font-[700] tracking-[-0.25px] leading-[1.6] md:mr-5">
                    £ {Number(e.total).toFixed(2)}
                  </span>
                </div>
                <div
                  className={`${
                    e.status == "paid"
                      ? "bg-green"
                      : e.status == "pending"
                      ? "bg-orange"
                      : "bg-black dark:bg-grey"
                  } w-[104px] h-10 flex justify-center items-center gap-2 rounded-[8px] opacity-transparent pt-[14px] pb-[11px]`}
                >
                  <div
                    className={`${
                      e.status == "paid"
                        ? "bg-[#33d69f]"
                        : e.status == "pending"
                        ? "bg-[#ff8f00]"
                        : "bg-[#373b53] dark:bg-[#dfe3fa]"
                    } w-2 h-2 rounded-full`}
                  ></div>
                  <span
                    className={`${
                      e.status == "paid"
                        ? "text-[#33d69f]"
                        : e.status == "pending"
                        ? "text-[#ff8f00]"
                        : "text-[#373b53] dark:text-[#dfe3fa]"
                    } text-[13px] font-[700] tracking-[-0.1px] leading-[1.15]`}
                  >
                    {e.status}
                  </span>
                </div>
                <img
                  className="hidden md:flex"
                  src="/assets/icon-arrow-right.svg"
                  alt="arror_right_icon"
                />
              </div>
            </section>
          );
        })
      ) : (
        <Empty content={content} />
      )}
    </main>
  );
}

export default Main;
