import { useContext, useState } from "react";
import { invoiceContext } from "../../../App";

function Main() {
  const content = useContext(invoiceContext);
  console.log(content.invoiceData);
  return (
    <main>
      {content.invoiceData.map((e) => {
        return (
          <section key={e.id}>
            <div>
              <h3>{e.id}</h3>
              <span>{e.clientName}</span>
            </div>
            <div>
              <div>
                <p>{e.paymentDue}</p>
                <span>£ {e.total}</span>
              </div>
              <div>
                <div></div>
                <span>{e.status}</span>
              </div>
              <img src="/assets/icon-arrow-right.svg" alt="arror_right_icon" />
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default Main;
