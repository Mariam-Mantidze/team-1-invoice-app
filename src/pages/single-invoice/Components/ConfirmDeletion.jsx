import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";

export default function ConfirmDeletion({
  id,
  showDelete,
  setShowDelete,
  deleteClick,
}) {
  return (
    <div
      style={{ zIndex: 3, transform: "translate(-50%,-50%) " }}
      className={`${
        showDelete ? "flex" : "hidden"
      } absolute top-[50%] left-[50%] flex-col p-12 bg-[#FFF] shadow-lg rounded-md gap-4 `}
    >
      <p className="text-[#0C0E16] text-lg font-bold leading-5 tracking-tight dark:text-[#FFF]">
        Confirm Deletation
      </p>
      <p className="text-[#858BB2] text-sm font-medium leading-5 tracking-tight black:text-[#DFE3FA]">
        Are you sure you want to delete invoice #{id}? This action cannot be
        undone.
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setShowDelete(false);
            console.log("hgj");
          }}
          className="rounded-full bg-[#F9FAFE] py-4 px-6 text-[#7E88C3] text-sm font-bold leading-tight tracking-tight hover:bg-[#DFE3FA]"
        >
          Cancel
        </button>
        <Link to={"/"}>
          <DeleteButton onClick={deleteClick} />
        </Link>
      </div>
    </div>
  );
}
