import { useState, type JSX } from "react";
import { displayResult, getReminderFromTableOfChangesDues, getTableOfChangesDues, getTableOfMaxDenominationCountDue, getTotalOfTable, getTotalOfTableOfChangesDue, isEachCountOfChangesEnough, makeChangeOperation, makeNewDrawer } from "../utilities/functions.ts";
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

        return displayResult(baseOfDenominations, statusMessages, changeInDrawer, changeDue, priceEntry, cashEntry, totalOfChangeInDrawer, totalOfTableOfChangeDue, getReminderFromTableOfChangesDues, getTableOfChangesDues, getTableOfMaxDenominationCountDue, isEachCountOfChangesEnough, makeChangeOperation, makeNewDrawer);
    }

    return (<div className="w-full h-auto mx-auto flex flex-col items-center justify-center">
        <h2>Welcome to my store</h2>
        <div className="w-full h-auto flex flex-col items-center justify-center">
            <label htmlFor="price">Please enter price</label>
            <Input inputType="text" entry={price} onEntry={(entry)=>{setPrice(entry.target.value)}} required={true} inputId="price" />
            <label htmlFor="cash">Please enter cash</label>
            <Input inputType="text" entry={cash} onEntry={(entry)=>{setCash(entry.target.value)}} required={true} inputId="cash" />
            <Button buttonType="button" buttonText="Purchase" className="w-fit h-fit rounded-lg p-1 bg-sky-200 active: scale-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 md:p-1 md:text-1xl lg:cursor-pointer transition lg:delay-100 lg:duration-200 lg:ease-in-out lg:hover:bg-gray-300 lg:dark:hover:bg-gray-500" onClick={handleDisplay} />
        </div>
        <div className="frame" id="change-due">
            {displaySatusMessage && <p>{displaySatusMessage}</p>}
            {displayOperationInfos && displayOperationInfos.map((row)=>(<p key={row.id}>{`${row.infos[0]}: $${row.infos[1]}`}</p>))}
        </div>
    </div>);
}
