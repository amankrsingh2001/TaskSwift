const Spinner = ({className}) => {
    return (
        <span className={`w-[22px] h-[22px] inline-block border-[4px] border-r-transparent animate-spin rounded-[50%] ${className}`}></span>
    )
}

export default Spinner;