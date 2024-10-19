import { LuPanelLeftClose } from "react-icons/lu";

const Logo = ({ className, showText, sidebarControler }) => {
  return (
    <div className={`box-border flex gap-2 items-center ${className || ""}`}>
      <span className={`flex-1 h-10`}>
        <img src={`/Logo/logo${!showText ? "_icon" : ""}.png `} alt="Task Tracker" className={`${!showText && "object-cover h-full scale-110 "}`}/>
      </span>
      <LuPanelLeftClose
        className={`p-1.5 cursor-pointer text-sm inline-block h-8 w-8 text-gray-600 ${
          !showText && "hidden"
        }`}
        onClick={sidebarControler}
      />
    </div>
  );
};

export default Logo;
