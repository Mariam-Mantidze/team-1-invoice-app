import { useContext } from "react";
import { invoiceContext } from "../../../App";

function Heading(props) {
  const context = useContext(invoiceContext);
  const activateFilter = () => {
    props.setActiveFilter(!props.activeFilter);
  };

  return (
    <header className=" w-[327px] flex justify-between items-center mt-8">
      <div>
        <h1 className="text-2xl text-[#0c0e16] font-[700] tracking-[-0.75px]">
          Invoices
        </h1>
        <p className="text-[13px] text-[#888eb0] font-[500] tracking-[-0.1px] leading-[1.15] mt-[3px]">
          <span>7</span> {""}
          invoices
        </p>
      </div>
      <div className="flex items-center gap-[18.5px]">
        <div className="flex items-center gap-3 relative">
          <span
            onClick={activateFilter}
            className="text-[15px] text-[#0c0e16] font-[700] tracking-[-0.25px] leading-[1]"
          >
            Filter
          </span>
          <img
            className={props.activeFilter ? "rotate-180" : ""}
            src="/public/assets/icon-arrow-down.svg"
            alt="arrow_down"
          />
          {props.activeFilter ? (
            <div className="w-[110px] h-[90px] rounded-[8px] bg-[#fff] shadow-filter flex flex-col justify-center gap-[10px] absolute bottom-[-108px] left-[-26px] p-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="draft"
                  className="appearance-none w-4 h-4 rounded-[2px] bg-[#dfe3fa] checked:bg-[#7c5dfa] checked:bg-[url('/assets/icon-check.svg')] checked:bg-no-repeat checked:bg-center"
                />
                <label
                  htmlFor="draft"
                  className="text-[13px] text-[#1e2139] font-[700] tracking-[-0.25px] leading-[1]"
                >
                  Draft
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pending"
                  className="appearance-none w-4 h-4 rounded-[2px] bg-[#dfe3fa] checked:bg-[#7c5dfa] checked:bg-[url('/assets/icon-check.svg')] checked:bg-no-repeat checked:bg-center"
                />
                <label
                  htmlFor="pending"
                  className="text-[13px] text-[#1e2139] font-[700] tracking-[-0.25px] leading-[1]"
                >
                  Pending
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="paid"
                  className="appearance-none w-4 h-4 rounded-[2px] bg-[#dfe3fa] checked:bg-[#7c5dfa] checked:bg-[url('/assets/icon-check.svg')] checked:bg-no-repeat checked:bg-center"
                />
                <label
                  htmlFor="paid"
                  className="text-[13px] text-[#1e2139] font-[700] tracking-[-0.25px] leading-[1]"
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
          onClick={() => context.navigate(`/new-invoice`)}
          className="w-[90px] h-[44px] rounded-[24px] bg-[#7c5dfa] flex items-center justify-center gap-2  pr-3"
        >
          <div className="w-8 h-8 rounded-full bg-[#fff] flex items-center justify-center">
            <img src="/public/assets/icon-plus.svg" alt="icon_plus" />
          </div>
          <span className="text-[15px] text-[#fff] font-[700] tracking-[-0.25px] leading-[1]">
            New
          </span>
        </button>
      </div>
    </header>
  );
}

export default Heading;
