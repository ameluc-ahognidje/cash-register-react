import { useState } from "react";
import { type Base, type Denomination } from "../utilitaries.ts";


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

    return (<>
        <div className="frame">
            <h2>Welcome to my store</h2>
        </div>

        <div className="frame">
            <label htmlFor="cash">Please enter cash</label>
            <input id="cash" type="number" min="0"/>
        </div>

        <div className="frame">
            <button id="purchase-btn">Purchase</button>
        </div>

        <div className="frame" id="change-due">
        </div>
    </>)
}
