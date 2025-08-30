import type { ChangeEvent, JSX, Ref } from "react";


interface InputProps
{
    className?: string,
    inputId?: string,
    inputType?: string,
    placeholder?: string,
    entry: string,
    required?: boolean,
    onEntry: (event: ChangeEvent<HTMLInputElement>) => void,
    ref?: Ref<HTMLInputElement>,
};


export default function Input({ className="", inputId="", inputType="text", placeholder="", entry, onEntry, required, ref } : InputProps) : JSX.Element
{
    return (<input
        className={ className }
        id={ inputId }
        type={ inputType }
        placeholder={ placeholder }
        aria-label={ inputType }
        value={ entry }
        onChange={ onEntry }
        required={ required }
        ref={ ref }
    />);
}
