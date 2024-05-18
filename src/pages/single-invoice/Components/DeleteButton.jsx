export default function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-[#EC5757] py-4 px-6 text-[#FFF] text-sm font-bold leading-tight tracking-tight hover:bg-[#FF9797]"
    >
      Delete
    </button>
  );
}
