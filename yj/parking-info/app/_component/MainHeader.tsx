import MenuIcon from "@/assets/menuIcon";

const MainHeader = () => {
  return (
    <div className="flex h-48pxr fixed top-0 bg-[#f8f8fa] w-[calc(100%-200px)] items-center justify-between px-12pxr">
      <div>filter section</div>
      <button className="h-fit border-grey p-4pxr rounded-4pxr ">
        <MenuIcon className="w-12pxr h-12pxr" />
      </button>
    </div>
  );
};

export default MainHeader;
