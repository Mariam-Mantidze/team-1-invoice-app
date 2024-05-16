import { useContext, useState, useEffect, useRef } from "react";
import { invoiceContext } from "../../../App";

function Main() {
  const content = useContext(invoiceContext);

  // using useref and useEffect to implement correct date
  const dateRef = useRef([]);
  useEffect(() => {
    const dates = content.invoiceData.map((e) => {
      const datestr = e.paymentDue;
      const parts = datestr.split("-");
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      const month = date.toLocaleString("en-us", { month: "long" });
      const day = date.getDate();
      const year = date.getFullYear();
      const fulldate = `${day} ${month} ${year}`;
      return { payDue: fulldate };
    });
    dateRef.current = dates;
  }, [content.invoiceData]);

  //   const fixedAmount = content.invoiceData.
  return (
    <main>
      {content.invoiceData.map((e, index) => {
        return (
          <section key={e.id}>
            <div>
              <h3>{e.id}</h3>
              <span>{e.clientName}</span>
            </div>
            <div>
              <div>
                <p>
                  due{" "}
                  {dateRef.current[index] ? dateRef.current[index].payDue : ""}
                </p>
                <span>£ {Number(e.total).toFixed(2)}</span>
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
