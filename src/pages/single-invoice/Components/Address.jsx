export default function Address({ owner, text }) {
  return (
    <div className={`md:text-${text}`}>
      <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight dark:text-[#DFE3FA]">
        {owner.street}
      </p>
      <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight dark:text-[#DFE3FA]">
        {owner.city}
      </p>
      <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight dark:text-[#DFE3FA]">
        {owner.postCode}
      </p>
      <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight dark:text-[#DFE3FA]">
        {owner.country}
      </p>
    </div>
  );
}
