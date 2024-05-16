import { invoiceContext } from "../../../App";
function Heading() {
  return (
    <header className="flex">
      <div>
        <h1>Invoices</h1>
        <p>
          <span></span>
          invoices
        </p>
      </div>
      <div>
        <div>
          <span>Filter</span>
          <img src="/public/assets/icon-arrow-down.svg" alt="arrow_down" />
        </div>
        <button>
          <div>
            <img src="/public/assets/icon-plus.svg" alt="icon_plus" />
          </div>
          <span>New</span>
        </button>
      </div>
    </header>
  );
}

export default Heading;
