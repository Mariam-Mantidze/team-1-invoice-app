export default function InvoteItem({ name, quantity, price, total }) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col md:flex-row md:justify-between md:w-[70%]">
        <p className="text-gray-900 text-lg font-bold leading-5 tracking-tight">
          {name}
        </p>

        <div className="flex text-gray-400 text-sm font-medium leading-5 tracking-tight gap-1 md:justify-between md:w-[48%]">
          <p>{quantity}</p> <span className="md:hidden">x</span>{" "}
          <p>£ {price}</p>
        </div>
      </div>
      <p className="text-gray-900 text-lg font-bold leading-5 tracking-tight">
        £ {total}
      </p>
    </div>
  );
}
