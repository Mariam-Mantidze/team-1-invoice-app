import { useContext, useState, useEffect } from "react";
import { invoiceContext } from "../../../App";
import NewInvoice from "../../forms/NewInvoice";
import styled from "styled-components";

function Heading(props) {
  const context = useContext(invoiceContext);

  const { isMobile, setIsOverlayOpen, isOverlayOpen, handleOpenOverlay } =
    useContext(invoiceContext);

  const activateFilter = () => {
    props.setActiveFilter(!props.activeFilter);
  };

  const [checkedBoxes, setCheckedBoxes] = useState(() => {
    const savedState = JSON.parse(localStorage.getItem("checkedBoxes"));
    return savedState || { draft: true, pending: true, paid: true };
  });

  const checkBoxHandler = (e) => {
    // trying to reach the value of exactBox and use index for that
    const exactBox = e.target.id;
    let index = 0;
    if (exactBox == "draft") {
      index = 0;
    } else {
      if (exactBox == "pending") {
        index = 1;
      } else {
        index = 2;
      }
    }
    // these entires helps to find value and give it to updatedBoxes
    const newValue = Object.entries(checkedBoxes);
    const updatedBoxes = {
      ...checkedBoxes,
      [exactBox]: !newValue[index][1],
    };
    setCheckedBoxes(updatedBoxes);
  };

  // data filter
  let updatedData = [];
  useEffect(() => {
    // firstly it filters only active statuses and next filters the given data acording to that statuses
    const activeStatuses = Object.keys(checkedBoxes).filter(
      (key) => checkedBoxes[key] === true
    );

    updatedData = context.invoiceData.filter((element) => {
      const statusname = Object.entries(element.status);
      const lower = statusname[1][1].toLowerCase();

      return activeStatuses.includes(lower);
    });

    props.setFilteredData(updatedData);
    localStorage.setItem("checkedBoxes", JSON.stringify(checkedBoxes));
  }, [checkedBoxes]);

  return (
    <div>
      <header
        className={` w-[327px] md:w-[672px] lg:w-[730px] flex justify-between items-center mt-8 md:mt-[62px] lg:mt-[68px]`}
      >
        <div>
          <h1 className="text-2xl md:text-4xl text-[#0c0e16] dark:text-[#fff] font-[700] tracking-[-0.75px] md:tracking-[-1.13px]">
            Invoices
          </h1>
          <p className="text-[13px] text-[#888eb0] dark:text-[#dfe3fa] font-[500] tracking-[-0.1px] leading-[1.15] mt-[3px] md:mt-[6px]">
            {context.isTablet || context.isDesktop
              ? props.filteredData.length == 0
                ? "No invoices"
                : props.filteredData.length == 1
                ? `There is ${props.filteredData.length} total invoice`
                : `There are ${props.filteredData.length} total invoices`
              : `${props.filteredData.length} invoices`}
          </p>
        </div>
        <div className="flex items-center gap-[18.5px] md:gap-10">
          <div className="flex items-center gap-3 md:gap-[14px] relative">
            <span
              onClick={activateFilter}
              className="text-[15px] text-[#0c0e16] dark:text-[#fff] font-[700] tracking-[-0.25px] leading-[1] hover:cursor-pointer"
            >
              {context.isTablet || context.isDesktop
                ? "Filter by status"
                : "Filter"}
            </span>
            <img
              className={props.activeFilter ? "rotate-180" : ""}
              src="/assets/icon-arrow-down.svg"
              alt="arrow_down"
            />
            {props.activeFilter ? (
              <div className="w-[110px] md:w-[192px] h-[90px] md:h-[128px] rounded-[8px] bg-[#fff] dark:bg-[#252945] shadow-filter dark:shadow-darkFilter flex flex-col justify-center gap-[10px] md:gap-[17px] absolute bottom-[-150px] left-[-26px] md:left-[-37px] p-3 md:p-6">
                <div className="flex items-center gap-2 md:gap-[13px]">
                  <input
                    type="checkbox"
                    id="draft"
                    checked={checkedBoxes.draft}
                    onChange={checkBoxHandler}
                    className="appearance-none w-4 h-4 rounded-[2px] bg-[#dfe3fa] dark:bg-[#1e2139] checked:bg-[#7c5dfa] dark:checked:bg-[#7c5dfa] checked:bg-[url('/assets/icon-check.svg')] checked:bg-no-repeat checked:bg-center hover:border hover:border-solid hover:border-[#7c5dfa] hover:cursor-pointer"
                  />
                  <label
                    htmlFor="draft"
                    className="text-[13px] md:text-[15px] text-[#1e2139] dark:text-[#fff] hover:text-[#0c0e16] hover:cursor-pointer font-[700] tracking-[-0.25px] leading-[1]"
                  >
                    Draft
                  </label>
                </div>
                <div className="flex items-center gap-2 md:gap-[13px]">
                  <input
                    type="checkbox"
                    id="pending"
                    checked={checkedBoxes.pending}
                    onChange={checkBoxHandler}
                    className="appearance-none w-4 h-4 rounded-[2px] bg-[#dfe3fa] dark:bg-[#1e2139] checked:bg-[#7c5dfa] dark:checked:bg-[#7c5dfa] checked:bg-[url('/assets/icon-check.svg')] checked:bg-no-repeat checked:bg-center hover:border hover:border-solid hover:border-[#7c5dfa] hover:cursor-pointer"
                  />
                  <label
                    htmlFor="pending"
                    className="text-[13px] md:text-[15px] text-[#1e2139] dark:text-[#fff] hover:text-[#0c0e16] hover:cursor-pointer font-[700] tracking-[-0.25px] leading-[1]"
                  >
                    Pending
                  </label>
                </div>
                <div className="flex items-center gap-2 md:gap-[13px]">
                  <input
                    type="checkbox"
                    id="paid"
                    onChange={checkBoxHandler}
                    checked={checkedBoxes.paid}
                    className="appearance-none w-4 h-4 rounded-[2px] bg-[#dfe3fa] dark:bg-[#1e2139] checked:bg-[#7c5dfa] dark:checked:bg-[#7c5dfa] checked:bg-[url('/assets/icon-check.svg')] checked:bg-no-repeat checked:bg-center hover:border hover:border-solid hover:border-[#7c5dfa] hover:cursor-pointer"
                  />
                  <label
                    htmlFor="paid"
                    className="text-[13px] md:text-[15px] text-[#1e2139] dark:text-[#fff] hover:text-[#0c0e16] hover:cursor-pointer font-[700] tracking-[-0.25px] leading-[1]"
                  >
                    Paid
                  </label>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() => {
              isMobile
                ? context.navigate(`/new-invoice`)
                : handleOpenOverlay(true);
            }}
            className="w-[90px] md:w-[150px] h-[44px] md:h-[48px] rounded-[24px] bg-[#7c5dfa] hover:bg-[#9277ff] hover:cursor-pointer flex items-center justify-center gap-2 md:gap-4 pr-3 md:pr-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#fff] flex items-center justify-center">
              <img src="/assets/icon-plus.svg" alt="icon_plus" />
            </div>
            <span className="text-[15px] text-[#fff] font-[700] tracking-[-0.25px] leading-[1]">
              {context.isTablet || context.isDesktop ? "New Invoice" : "New"}
            </span>
          </button>
        </div>
      </header>
      {/* {isOverlayOpen && (
        <Overlay>
          <NewInvoice />
        </Overlay>
      )} */}
    </div>
  );
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  z-index: 1000;
`;

const OverlayContent = styled.div`
  /* padding: 20px; */
  /* border-radius: 8px; */
  /* width: 80%; */
  /* max-width: 600px; */
`;

export default Heading;
