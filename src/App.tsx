import { useState, type JSX } from "react";
import { getOperationInformations, getReminderFromTableOfChangesDues, getTableOfChangesDues, getTableOfMaxDenominationCountDue, getTotalOfTable, getTotalOfTableOfChangesDue, isEachCountOfChangesEnough, makeChangeOperation, makeNewDrawer } from "../utilities/functions.ts";
import type {  Base, Denomination } from "../utilities/types.ts";
import Button from "./components/Button.tsx";
import Input from "./components/Input.tsx";


let changeInDrawer: Denomination[] = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];
const baseOfDenominations: Base = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};
const statusMessages: string[] = [
    "No change due - customer paid with exact cash",
    "Status: INSUFFICIENT FUNDS",
    "Status: CLOSED",
    "Status: OPEN"
];

export default function App(): JSX.Element
{
    const [cash, setCash] = useState<string>("");
    const [displaySatusMessage, setDisplaySatusMessage] = useState<string>("");
    const [displayOperationInfos, setDisplayOperationInfos] = useState<{id: string, infos: Denomination}[] | null>(null);
    const [price, setPrice] = useState<string>("");
    const [isString, setIsString] = useState<boolean>(false);
    const [isZero, setIsZero] = useState<boolean>(false);

    function handleDisplay(): void
    {
        const result: string | [string, Denomination[]] | void = handlePurchase();

        if (result)
        {
            if (typeof result === "string")
            {
                setDisplaySatusMessage(result);
                setDisplayOperationInfos(null);
            }
            else
            {
                const [statusMsg, changeOpInfo] = result;
                const changeInfo: {id: string, infos: Denomination}[] = changeOpInfo.map((row)=>({id: crypto.randomUUID(), infos: row}));

                setDisplaySatusMessage(statusMsg);
                setDisplayOperationInfos(changeInfo);
            }
        }
    }

    function handlePurchase(): string | [string, Denomination[]] | void
    {
        const cashEntry: number = Number(cash);
        const priceEntry: number = Number(price);
        const changeDue: number = Number((cashEntry - priceEntry).toFixed(2));
        const totalOfChangeInDrawer: number = Number(getTotalOfTable(changeInDrawer).toFixed(2));
        const totalOfTableOfChangeDue: number = getTotalOfTableOfChangesDue(priceEntry, cashEntry, baseOfDenominations, changeInDrawer, getTableOfChangesDues, getTotalOfTable);

        return getOperationInformations(baseOfDenominations, statusMessages, changeInDrawer, changeDue, priceEntry, cashEntry, totalOfChangeInDrawer, totalOfTableOfChangeDue, getReminderFromTableOfChangesDues, getTableOfChangesDues, getTableOfMaxDenominationCountDue, isEachCountOfChangesEnough, makeChangeOperation, makeNewDrawer);
    }

    function handleInput(): JSX.Element | void
    {
        if (isString)
        {
            return (<div className="w-full h-auto
                mt-4
                rounded-2xl
                p-[2px]
                shadow-[inset_2px_2px_16px_#bbbbbb]
                dark:shadow-[inset_2px_2px_16px_#444444]
                flex flex-col items-center justify-center">
                <div className="w-full h-auto
                    rounded-[14px]
                    p-4
                    bg-linear-145 from-[#dfe1e3] to-[#ffffff]
                    dark:bg-linear-145 dark:from-[#3e4d61] dark:to-[#4a5b74]
                    flex
                    flex-col
                    items-center
                    justify-center">
                    <p className="text-red-400">Please enter a number!</p>
                </div>
            </div>)
        }
        else if (isZero)
        {
            return (<div className="w-full h-auto
                mt-4
                rounded-2xl
                p-[2px]
                shadow-[inset_2px_2px_16px_#bbbbbb]
                dark:shadow-[inset_2px_2px_16px_#444444]
                flex flex-col items-center justify-center">
                <div className="w-full h-auto
                    rounded-[14px]
                    p-4
                    bg-linear-145 from-[#dfe1e3] to-[#ffffff]
                    dark:bg-linear-145 dark:from-[#3e4d61] dark:to-[#4a5b74]
                    flex
                    flex-col
                    items-center
                    justify-center">
                    <p className="text-red-400">Please enter a number greater than 0!</p>
                </div>
            </div>);
        }
        else
        {
            if (price.length !== 0 && cash.length !== 0 && displaySatusMessage)
            {
                return (<div className="w-full h-auto
                    mt-4
                    rounded-2xl
                    p-[2px]
                    shadow-[inset_2px_2px_16px_#bbbbbb]
                    dark:shadow-[inset_2px_2px_16px_#444444]
                    flex flex-col items-center justify-center">
                    <div className="w-full h-auto
                        rounded-[14px]
                        p-4
                        bg-linear-145 from-[#dfe1e3] to-[#ffffff]
                        dark:bg-linear-145 dark:from-[#3e4d61] dark:to-[#4a5b74]
                        flex
                        flex-col
                        items-center
                        justify-center">
                        <p>{displaySatusMessage}</p>
                        {displayOperationInfos && displayOperationInfos.map((row)=>(<p key={row.id}>{`${row.infos[0]}: $${row.infos[1]}`}</p>))}
                    </div>
                </div>);
            }
        }
    }

    return (<>
        <div className="w-full h-auto
            mb-10
            flex
            flex-col
            items-center
            justify-center
            italic
            text-2xl
            underline
            md:text-3xl
            lg:text-4xl">
            <h2>Welcome to The Store!</h2>
        </div>
        <div className="w-full h-auto flex flex-col items-center justify-center">
            <label className="md:text-xl lg:text-2xl" htmlFor="price">Price</label>
            <Input className="w-full h-auto
                    mt-2
                    mb-4
                    rounded-xl
                    px-4
                    py-2
                    shadow-[inset_12px_12px_16px_#d3d5d6,inset_-12px_-12px_16px_#ffffff]
                    dark:shadow-[inset_12px_12px_16px_#3b485c,inset_-12px_-12px_16px_#4f627c]
                    placeholder:text-center
                    placeholder:italic
                    placeholder:text-xs
                    placeholder-gray-500
                    dark:placeholder-gray-300
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-400"
                inputType="text"
                entry={price}
                onEntry={(entry)=>{
                    setPrice(entry.target.value);
                    if (price.length === 0)
                    {
                        setDisplaySatusMessage("")
                    }
                    else
                    {
                        isNaN(Number(price)) ? setIsString(true) : setIsString(false);
                        Number(price) === 0 ? setIsZero(true) : setIsZero(false);
                    }
                }}
                required={true}
                inputId="price"
                placeholder="Type here..."
            />
            <label className="md:text-xl lg:text-2xl" htmlFor="cash">Cash</label>
            <Input className="w-full h-auto
                    mt-2
                    mb-4
                    rounded-xl
                    px-4
                    py-2
                    shadow-[inset_12px_12px_16px_#d3d5d6,inset_-12px_-12px_16px_#ffffff]
                    dark:shadow-[inset_12px_12px_16px_#3b485c,inset_-12px_-12px_16px_#4f627c]
                    placeholder:text-center
                    placeholder:italic
                    placeholder:text-xs
                    placeholder-gray-500
                    dark:placeholder-gray-300
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-400"
                inputType="text"
                entry={cash}
                onEntry={(entry)=>{
                    setCash(entry.target.value);
                    if (cash.length === 0)
                    {
                        setDisplaySatusMessage("")
                    }
                    else
                    {
                        isNaN(Number(cash)) ? setIsString(true) : setIsString(false);
                        Number(cash) === 0 ? setIsZero(true) : setIsZero(false);
                    }
                }}
                required={true}
                inputId="cash"
                placeholder="Type here..."
            />
            <Button
                buttonType="button"
                buttonText="Purchase"
                className="w-full h-auto
                    my-4
                    rounded-xl
                    px-10
                    py-2
                    shadow-[12px_12px_16px_#d3d5d6,-12px_-12px_16px_#ffffff]
                    dark:shadow-[12px_12px_20px_#3b485c,-12px_-12px_20px_#4f627c]
                    text-teal-600
                    dark:text-sky-200
                    active:scale-95
                    active:shadow-none
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-400
                    md:w-fit
                    md:px-10
                    md:py-2
                    md:text-1xl
                    lg:cursor-pointer
                    lg:border-1
                    lg:border-amber-500/0
                    transition
                    lg:delay-100
                    lg:duration-200
                    lg:ease-in-out
                    lg:hover:border-teal-500
                    dark:lg:hover:border-sky-100
                    lg:active:border-white/0
                    dark:lg:active:border-white/0
                    disabled:active:scale-none
                    disabled:lg:hover:border-red-500
                    disabled:active:shadow-[12px_12px_16px_#d3d5d6,-12px_-12px_16px_#ffffff]
                    disabled:dark:active:shadow-[12px_12px_16px_#3c1501,-12px_-12px_16px_#511d01]"
                onClick={handleDisplay}
                buttonActive={price.length === 0 || cash.length === 0 ? true : false}
            />
        </div>
        {handleInput()}
    </>);
}
