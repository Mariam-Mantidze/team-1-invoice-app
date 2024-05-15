export default function Header() {
  return (
    <div className="h-[72px] bg-[#373b53] flex items-center justify-between pr-6">
      <div className="w-[72px] h-[72px] flex items-end relative bg-[#7c5dfa] rounded-tr-[20px] rounded-br-[20px]">
        <div className="h-9 w-[72px] bg-[#9277ff] rounded-br-[20px] rounded-tl-[20px]"></div>
        <img
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src="/public/assets/logo.svg"
          alt="logo"
        />
      </div>
      <div className="flex items-center gap-6 ">
        <img src="/public/assets/icon-moon.svg" alt="moon_icon" />
        <hr className="h-[74px] w-[1px] bg-[#494e6e]" />
        <img
          className="w-8 h-8 rounded-full"
          src="/public/assets/image-avatar.jpg"
          alt="avatar"
        />
      </div>
    </div>
  );
}
