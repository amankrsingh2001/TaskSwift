const Logo = ({ className , showText}) => {
  return (
    <div className={`box-border flex gap-2 items-center ${className || ""}`}>
      <span className="h-10 w-10 rounded-full bg-slate-400 inline-block"></span>

      { showText && (
        <div className="text-2xl">
          <span className="font-poppins text-md font-bold italic text-blue-700">
            G
          </span>
          oal
          <span className="font-poppins text-md font-bold italic text-blue-700">
            G
          </span>
          uru
        </div>
      )}
    </div>
  );
};

export default Logo;
