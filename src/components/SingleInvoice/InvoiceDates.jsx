export default function InvoiceDates({ name, date }) {
  return (
    <div className="flex flex-col gap-[13px]">
      <p className="text-gray-400 text-sm font-medium leading-5 tracking-tight">
        {name}
      </p>
      <p className="text-gray-900 text-lg font-bold leading-5 tracking-tight">
        {date}
      </p>
    </div>
  );
}
