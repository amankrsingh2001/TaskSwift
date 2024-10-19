const Tag = ({data}) =>{
    const {text, color, bgColor } = data;
    return(
        <span className={`px-[8px] py-[4px] rounded-full text-[10px] leading-3 inline-block h-[20px] capitalize font-semibold ${data?.className}`} style={{
            color:`${color}`,
            backgroundColor:`${bgColor}`
          }}
          >
            {text}
          </span>
    )
}
export default Tag;