import { useState } from "react";
import { displayResult, getNewChangeInDrawer, getReminderFromChangeTable, getTableOfChangeDue, getTableOfDueCount, getTotalCountOfChange, getTotalOfTable, isIndividualCountOfChangeSufficient, makeChangeOperation, type Base, type Denomination } from "../utilitaries.ts";
import Button from "./components/Button.tsx";
import Input from "./components/Input.tsx";


let changeUsed:Denomination[] = [];

let changeInDrawer:Denomination[] = [
    [ "PENNY", 1.01 ],
    [ "NICKEL", 2.05 ],
    [ "DIME", 3.1 ],
    [ "QUARTER", 4.25 ],
    [ "ONE", 90 ],
    [ "FIVE", 55 ],
    [ "TEN", 20 ],
    [ "TWENTY", 60 ],
    [ "ONE HUNDRED", 100 ]
];

const statusMessages:string[] = [
    "No change due - customer paid with exact cash",
    "Status: INSUFFICIENT FUNDS",
    "Status: CLOSED",
    "Status: OPEN"
];

const baseOfDenominations:Base = {
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

export default function App()
{
    const [ cash, setCash ] = useState<string>("");
    const [ price, setPrice ] = useState<string>("");
    const [ display , setDisplay ] = useState<string>("");

    function handlePurchase():void
    {
        const cashEntry = Number(cash);
        const priceEntry = Number(price)
        const changeDue = Number((cashEntry - priceEntry).toFixed(2));
        const totalOfChangeInDrawer = Number(getTotalOfTable(changeInDrawer).toFixed(2));
        const totalOfTableOfChangeDue = getTotalCountOfChange(cashEntry, priceEntry, changeInDrawer, baseOfDenominations, getTableOfChangeDue, getTotalOfTable);

        // display.innerHTML = "";
        // usedChange = [];

        displayResult(totalOfChangeInDrawer, totalOfTableOfChangeDue, cashEntry, changeDue, display, priceEntry, statusMessages, isIndividualCountOfChangeSufficient, baseOfDenominations, changeInDrawer, getTableOfChangeDue, getTableOfDueCount, makeChangeOperation, changeUsed, getNewChangeInDrawer, getReminderFromChangeTable);
    }

    return (<>
        <div className="frame">
            <h2>Welcome to my store</h2>
        </div>

        <div className="frame">
            <label htmlFor="cash">Please enter cash</label>
            <Input inputType="number" entry={cash} onEntry={ (entry) => {setCash(entry.target.value)} }/>
            <label htmlFor="cash">Please enter price</label>
            <Input inputType="number" entry={price} onEntry={ (entry) => {setPrice(entry.target.value)} }/>
            <input id="cash" type="number" min="0"/>
        </div>

        <div className="frame">
            <Button buttonType="button"
                buttonText="Purchase"
                className="w-fit h-fit
                    rounded-lg
                    p-1
                    bg-sky-200
                    active:scale-60
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-400
                    md:p-1
                    md:text-1xl
                    lg:cursor-pointer
                    transition
                    lg:delay-100
                    lg:duration-200
                    lg:ease-in-out
                    lg:hover:bg-gray-300
                    lg:dark:hover:bg-gray-500
                "
                onClick={ handlePurchase }
            />
            <button id="purchase-btn">Purchase</button>
        </div>

        <div className="frame" id="change-due">
            { display }
        </div>
    </>)
}
