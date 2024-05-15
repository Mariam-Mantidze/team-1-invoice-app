export default function Header() {
  return (
    <div className="h-[72px] md:h-20 bg-[#373b53] flex items-center justify-between pr-6 md:pr-[32px]">
      <div className="w-[72px] md:w-20 h-[72px] md:h-20 flex items-end relative bg-[#7c5dfa] rounded-tr-[20px] rounded-br-[20px]">
        <div className="h-9 md:h-10 w-[72px] md:w-20 bg-[#9277ff] rounded-br-[20px] rounded-tl-[20px]"></div>
        <img
          className="absolute md:w-[31px] md:h-[31px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src="/public/assets/logo.svg"
          alt="logo"
        />
      </div>
      <div className="flex items-center gap-6 md:gap-8">
        <img src="/public/assets/icon-moon.svg" alt="moon_icon" />
        <hr className="h-[74px] md:h-[82px] w-[1px] bg-[#494e6e]" />
        <img
          className="w-8 h-8 rounded-full"
          src="/public/assets/image-avatar.jpg"
          alt="avatar"
        />
      </div>
    </div>
  );
}
