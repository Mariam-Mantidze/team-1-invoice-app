export default function InvoteItem({ name, quantity, price, total }) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <p className="text-gray-900 text-lg font-bold leading-5 tracking-tight">
          {name}
        </p>
        <p className="text-gray-400 text-sm font-medium leading-5 tracking-tight">
          {quantity} <span>x</span> £ {price}
        </p>
      </div>
      <p className="text-gray-900 text-lg font-bold leading-5 tracking-tight">
        £ {total}
      </p>
    </div>
  );
}
