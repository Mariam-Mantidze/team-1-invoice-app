import Arrowleft from "/assets/icon-arrow-left.svg";

export default function GoBack() {
  return (
    <div className="flex items-center gap-4">
      <img src={Arrowleft} alt="left arrow icon" />
      <p className="text-gray-900 text-lg font-bold leading-tight tracking-tight">
        Go back
      </p>
    </div>
  );
}
