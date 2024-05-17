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
            <div className="w-[90px] h-20 rounded-[8px] bg-[#fff] shadow-filter absolute bottom-[-98px] left-[-16px]">
              <div>
                <input type="checkbox" />
                <label htmlFor="">Draft</label>
              </div>
              <div>
                <input type="checkbox" />
                <label htmlFor="">Pending</label>
              </div>
              <div>
                <input type="checkbox" />
                <label htmlFor="">Paid</label>
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
