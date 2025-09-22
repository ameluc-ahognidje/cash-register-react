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
            <label htmlFor="price">Price</label>
            <Input className="w-full h-auto
                    mt-2
                    mb-4
                    rounded-xl
                    px-4
                    py-2
                    shadow-[inset_12px_12px_16px_#d9d5c8,inset_-12px_-12px_16px_#ffffff]
                    dark:shadow-[inset_12px_12px_16px_#3c1501,inset_-12px_-12px_16px_#511d01]
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
                onEntry={(entry)=>{setPrice(entry.target.value)}}
                required={true}
                inputId="price"
                placeholder="Type here..."
            />
            <label htmlFor="cash">Cash</label>
            <Input className="w-full h-auto
                    mt-2
                    mb-4
                    rounded-xl
                    px-4
                    py-2
                    shadow-[inset_12px_12px_16px_#d9d5c8,inset_-12px_-12px_16px_#ffffff]
                    dark:shadow-[inset_12px_12px_16px_#3c1501,inset_-12px_-12px_16px_#511d01]
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
                onEntry={(entry)=>{setCash(entry.target.value)}}
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
                    shadow-[12px_12px_16px_#d9d5c8,-12px_-12px_16px_#ffffff]
                    dark:shadow-[12px_12px_16px_#3c1501,-12px_-12px_16px_#511d01]
                    text-amber-600
                    dark:text-amber-200
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
                    lg:hover:border-amber-500
                    dark:lg:hover:border-amber-100
                    lg:active:border-amber-500/0
                    dark:lg:active:border-amber-100/0
                    disabled:lg:cursor-not-allowed
                    disabled:active:scale-100
                    disabled:lg:hover:border-amber-50/0
                    disabled:active:shadow-[12px_12px_16px_#d9d5c8,-12px_-12px_16px_#ffffff]
                    disabled:dark:active:shadow-[12px_12px_16px_#3c1501,-12px_-12px_16px_#511d01]"
                onClick={handleDisplay}
                buttonActive={price.length === 0 || cash.length === 0 ? true : false}
            />
        </div>
        {displaySatusMessage && <div className="w-full h-auto
            mt-4
            rounded-2xl
            p-[2px]
            shadow-[inset_1px_1px_16px_#d9d5c8,inset_-1px_-1px_16px_#ffffff]
            flex flex-col items-center justify-center">
            <div className="w-full h-auto
                rounded-[14px]
                p-4
                bg-linear-165 from-[#fffffb] to-40% to-[#fffbeb]
                flex
                flex-col
                items-center
                justify-center">
                {displaySatusMessage && <p>{displaySatusMessage}</p>}
                {displayOperationInfos && displayOperationInfos.map((row)=>(<p key={row.id}>{`${row.infos[0]}: $${row.infos[1]}`}</p>))}
            </div>
        </div>}
    </>);
}
