export default function Header() {
  return (
    <div className="h-[72px] md:h-20 lg:h-auto lg:w-[103px] bg-[#373b53] flex lg:flex-col items-center justify-between pr-6 md:pr-[32px] lg:pr-0 lg:pb-6 lg:rounded-tr-[20px] lg:rounded-br-[20px]">
      <div className="w-[72px] md:w-20 lg:w-[103px] h-[72px] md:h-20 lg:h-[103px] flex items-end relative bg-[#7c5dfa] rounded-tr-[20px] rounded-br-[20px]">
        <div className="h-9 md:h-10 lg:h-[51px] w-[72px] md:w-20 lg:w-[103px] bg-[#9277ff] rounded-br-[20px] rounded-tl-[20px]"></div>
        <img
          className="absolute md:w-[31px] lg:w-10 md:h-[31px] lg:h-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src="/assets/logo.svg"
          alt="logo"
        />
      </div>
      <div className="flex lg:flex-col items-center gap-6 md:gap-8">
        <img src="/assets/icon-moon.svg" alt="moon_icon" />
        <hr className="h-[74px] md:h-[82px] lg:h-[1px] w-[1px] lg:w-[105px] bg-[#494e6e] lg:border-none" />
        <img
          className="w-8 lg:w-10 h-8 lg:h-10 rounded-full lg:mt-[-8px]"
          src="/assets/image-avatar.jpg"
          alt="avatar"
        />
      </div>
    </div>
  );
}
