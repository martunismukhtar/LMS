
'use client'

type Props = {
    className?:string,
    children?:string,
    type?:"button" | "submit" | "reset",
    onClick?:()=>void
}
const Button = (props:Props) => {    
    const {
        children="...",
        className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white ",
        type="button",
        onClick=()=>{}
    } = props
    return (
        <div className="m-2">
        <button className={`${className} w-full px-4 py-2 rounded`} type={`${type}`} onClick={onClick}>{children}</button>
        </div>
    );
}

export default Button