export default function Address({ owner, text }) {
  return (
    <div className={`md:text-${text}`}>
      <p className="text-gray-400 text-sm font-medium leading-5 tracking-tight">
        {owner.street}
      </p>
      <p className="text-gray-400 text-sm font-medium leading-5 tracking-tight">
        {owner.city}
      </p>
      <p className="text-gray-400 text-sm font-medium leading-5 tracking-tight">
        {owner.postCode}
      </p>
      <p className="text-gray-400 text-sm font-medium leading-5 tracking-tight">
        {owner.country}
      </p>
    </div>
  );
}
