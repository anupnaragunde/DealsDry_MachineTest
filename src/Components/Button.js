export default function IconBtn({
    text,
    onclick,
    children,
    
  }) {
    return (
      <button
        
        onClick={onclick}
        className={`flex items-center bg-[#E7C009] cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-black`}
      >
        {children ? (
          <>
            <span >{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }