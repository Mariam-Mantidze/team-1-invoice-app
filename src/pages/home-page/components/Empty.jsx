function Empty() {
  return (
    <section className="flex flex-col items-center gap-6 mt-[70px]">
      <img
        src="/assets/illustration-empty.svg"
        alt="empty"
        className="w-[193px] h-40"
      />
      <h1 className="text-2xl text-[#0c0e16] font-[700] tracking-[-0.75px]">
        There is nothing here
      </h1>
      <p className="w-[185px] text-[13px] text-[#888eb0] font-[500] tracking-[-0.1px] leading-[1.15] text-center">
        Create an invoice by clicking the{" "}
        <span className="font-[700]">New</span> button and get started
      </p>
    </section>
  );
}

export default Empty;
