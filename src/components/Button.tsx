import type { JSX, Ref } from "react";


interface ButtonProps
{
    className?: string,
    buttonActive?: boolean
    buttonIcon?: JSX.Element,
    buttonId?: string,
    buttonImg?: string,
    buttonText?: string,
    buttonType: "submit" | "reset" | "button" | undefined,
    onClick?: () => void,
    ref?: Ref<HTMLButtonElement>
};


export default function Button({ className="", buttonActive=false, buttonIcon, buttonId="", buttonImg="", buttonText="", buttonType, onClick, ref } : ButtonProps) : JSX.Element
{
    return (<button className={ className } id={ buttonId } type={ buttonType } onClick={ onClick } ref={ ref } disabled={ buttonActive }>
        { buttonImg && <img src={ buttonImg } alt={ buttonText ? "" : buttonText } /> }
        { buttonIcon && buttonIcon }
        { buttonText && buttonText }
    </button>);
}
