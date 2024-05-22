export default function InvoiceDates({ name, date }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight dark:text-[#DFE3FA]">
        {name}
      </p>
      <p className="text-[#0C0E16] text-lg font-bold leading-5 tracking-tight  dark:text-[#FFF]">
        {date}
      </p>
    </div>
  );
}
