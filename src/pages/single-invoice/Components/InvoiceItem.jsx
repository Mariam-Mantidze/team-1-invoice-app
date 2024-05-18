export default function InvoteItem({ name, quantity, price, total }) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col md:flex-row md:justify-between md:w-[70%]">
        <p className="text-[#0C0E16] text-lg font-bold leading-5 tracking-tight dark:text-[#FFF]">
          {name}
        </p>

        <div className="flex text-[#858BB2] text-sm font-medium leading-5 tracking-tight gap-1 md:justify-between md:w-[48%] dark:text-[#DFE3FA]">
          <p>{quantity}</p> <span className="md:hidden">x</span>{" "}
          <p>£ {price}</p>
        </div>
      </div>
      <p className="text-[#0C0E16] text-lg font-bold leading-5 tracking-tight dark:text-[#FFF]">
        £ {total}
      </p>
    </div>
  );
}
