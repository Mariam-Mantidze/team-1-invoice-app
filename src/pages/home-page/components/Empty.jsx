function Empty(props) {
  return (
    <section
      className={`${
        props.content.darkMode ? "dark" : ""
      } flex flex-col items-center gap-6 mt-[70px] md:mt-[120px]`}
    >
      <img
        src="/assets/illustration-empty.svg"
        alt="empty"
        className="w-[193px] md:w-[241px] h-40 md:h-[200px]"
      />
      <h1 className="text-2xl text-[#0c0e16] font-[700] tracking-[-0.75px] mt-[18px] md:mt-[33px]">
        There is nothing here
      </h1>
      <p className="w-[185px] md:w-[210px] text-[13px] text-[#888eb0] font-[500] tracking-[-0.1px] leading-[1.15] text-center">
        Create an invoice by clicking the{" "}
        <span className="font-[700]">
          {props.content.isDesktop || props.content.isTablet
            ? "New Invoice"
            : "New"}
        </span>{" "}
        button and get started
      </p>
    </section>
  );
}

export default Empty;
