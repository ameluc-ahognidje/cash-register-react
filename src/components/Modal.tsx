import { useEffect, useRef, type JSX } from "react";


interface ModalProps
{
    isOpen: boolean,
    onClose: () => void,
};


export default function Modal({ isOpen, onClose }: ModalProps) : JSX.Element | null
{
    const modalRef = useRef<HTMLDivElement>(null);
    const openerRef = useRef<HTMLElement | null>(null);
    const firstFieldRef = useRef<HTMLInputElement>(null);
    // const lastFocusableRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen)
        {
            // Sauvegarde l'élément qui a ouvert la modale
            openerRef.current = document.activeElement as HTMLElement;

            // Focus sur le premier champ
            firstFieldRef.current?.focus();

            function handleKeyDown(e: KeyboardEvent)
            {
                if (e.key === "Escape")
                {
                    e.preventDefault();
                    onClose();
                }
                if (e.key === "Tab")
                {
                    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                        "input, button, a, textarea, select, [tabindex]:not([tabindex='-1'])"
                    );

                    if (!focusableElements || focusableElements.length === 0) return;

                    const firstEl = focusableElements[0];
                    const lastEl = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstEl)
                    {
                        e.preventDefault();
                        lastEl.focus();
                    }
                    if (!e.shiftKey && document.activeElement === lastEl)
                    {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }

            document.addEventListener("keydown", handleKeyDown);

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
        else
        {
            // Restaure le focus sur l’élément qui a ouvert la modale
            openerRef.current?.focus();
        }
    },
    [isOpen, onClose]);

    if (!isOpen) return null;

    return (<div>
    </div>);
}
