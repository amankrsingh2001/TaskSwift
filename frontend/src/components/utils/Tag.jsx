const Tag = ({data}) =>{
    const {text, color, bgColor } = data;
    return(
        <span className={`px-[8px] py-[6px] rounded-full text-[12px] leading-3 inline-block h-[24px] capitalize font-normal ${data?.className}`} style={{
            color:`${color}`,
            backgroundColor:`${bgColor}`
          }}
          >
            {text}
          </span>
    )
}
export default Tag;