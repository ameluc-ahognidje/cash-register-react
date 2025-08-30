
// export function getTotalOfTableSlim(table:Denomination[]) :number
// {
//     return table.reduce((previousValue: number, currentValue:Denomination) => previousValue + currentValue[1], 0);
// }

export type Denomination = [ string, number ];
export type Base = { [key:string]:number };

export type GetTotalOfTable = (table:Denomination[])=>number;
export type GetTableOfChangeDue = (change:number, baseOfDenominations:Base, table:Denomination[])=>Denomination[];
export type GetNewChangeInDrawer = (amount:number, table:Denomination, changeInDrawer:Denomination[]) => Denomination[];
export type GetTableOfDueCount = (change:number, baseOfDenominations:Base, table:Denomination[]) => Denomination;
export type GetCountOfChange = (cash:number, price:number, changeInDrawer:Denomination[], baseOfDenominations:Base, getTableOfChange:GetTableOfChange, getTotalOfTable:GetTotalOfTable)=>number;
export type GetTableOfChange = (change:number, baseOfDenominations:Base, changeInDrawer:Denomination[]) => Denomination[];
export type GetReminderFromChangeTable = (change:number, baseOfDenominations:Base, changeUsed:Denomination[], changeInDrawer:Denomination[], getNewChangeInDrawer:GetNewChangeInDrawer, getTableOfChange:GetTableOfChange, getTableOfDueCount:GetTableOfDueCount)=>number;
export type IsIndividualCountOfChangeSufficient = (change:number, baseOfDenominations:Base, changeInDrawer:Denomination[], getTableOfChange:GetTableOfChange, getTableOfDueCount:GetTableOfDueCount) => boolean;
export type MakeChangeOperation = (change:number, baseOfDenominations:Base, changeUsed:Denomination[], changeInDrawer:Denomination[], getNewChangeInDrawer:GetNewChangeInDrawer, getTableOfChange:GetTableOfChange, getTableOfDueCount:GetTableOfDueCount, getReminderFromChangeTable:GetReminderFromChangeTable)=>void;


export function getTotalOfTable(table:Denomination[]):number
{
    let total:number = 0;

    table.forEach((element:Denomination) => {
        total += element[1]
    });

    return total;
}

export function getTableOfChangeDue(change:number, baseOfDenominations:Base, table:Denomination[]):Denomination[]
{
    const tableOfChangeDue:Denomination[] = [];

    for (let [denomination, amount] of table)
    {
        if (amount > 0 && baseOfDenominations[denomination] <= change)
        {
            tableOfChangeDue.push([denomination, amount])
        }
    }

    return tableOfChangeDue;
}

export function getNewChangeInDrawer(amount:number, table:Denomination, changeInDrawer:Denomination[]):Denomination[]
{
    return changeInDrawer = changeInDrawer.map((row:Denomination) => {
        if (row[0] === table[0])
        {
            return [row[0], Number((row[1] - amount).toFixed(2))];
        }
        else
        {
            return row;
        }
    });
}

export function getTableOfDueCount(change:number, baseOfDenominations:Base, table:Denomination[]):Denomination
{
    let maxDenominationDue:string = table[table.length - 1][0];
    let maxCountDue:number;

    const dueCount1:number = Math.floor(change / baseOfDenominations[maxDenominationDue]);
    const dueCount2:number = Math.floor(table[table.length - 1][1] / baseOfDenominations[maxDenominationDue]);

    if (dueCount1 <= dueCount2)
    {
        maxCountDue = dueCount1;
    }
    else{
        maxCountDue = dueCount2
    }

    return [maxDenominationDue, maxCountDue];
}

export function getCountOfChange(cash:number, price:number, changeInDrawer:Denomination[], baseOfDenominations:Base, getTableOfChange:GetTableOfChange, getTotalOfTable:GetTotalOfTable):number
{
    const changeDue = Number((cash - price).toFixed(2));
    const changeDueTable:Denomination[] = getTableOfChange(changeDue, baseOfDenominations, changeInDrawer);
    const totalOfTableOfChangeDue:number = getTotalOfTable(changeDueTable);

    return totalOfTableOfChangeDue;
}

export function isIndividualCountOfChangeSufficient(
    change:number,
    baseOfDenominations:Base,
    changeInDrawer:Denomination[],
    getTableOfChange:GetTableOfChange,
    getTableOfDueCount:GetTableOfDueCount
):boolean
{
    let dueTable = getTableOfChange(change, baseOfDenominations, changeInDrawer);

    while (change > 0 && dueTable.length > 1)
    {
        dueTable = getTableOfChange(change, baseOfDenominations, changeInDrawer);
        const maxTableDue = getTableOfDueCount(change, baseOfDenominations, dueTable);
        const maxAmountDue = Number((baseOfDenominations[maxTableDue[0]] * maxTableDue[1]).toFixed(2));
        change = Number((change - maxAmountDue).toFixed(2));
    }
    return change === 0;
}

export function getReminderFromChangeTable(
    change:number,
    baseOfDenominations:Base,
    changeUsed:Denomination[],
    changeInDrawer:Denomination[],
    getNewChangeInDrawer:GetNewChangeInDrawer,
    getTableOfChange:GetTableOfChange,
    getTableOfDueCount:GetTableOfDueCount
):number
{
    const changeDueTable = getTableOfChange(change, baseOfDenominations, changeInDrawer);
    const maxTableDue = getTableOfDueCount(change, baseOfDenominations, changeInDrawer);
    const maxAmountDue = Number((baseOfDenominations[maxTableDue[0]] * maxTableDue[1]).toFixed(2))
    changeUsed.push([maxTableDue[0], maxAmountDue]);
    getNewChangeInDrawer(maxAmountDue, maxTableDue, changeInDrawer);

    return Number((change - maxAmountDue).toFixed(2));
}

export function makeChangeOperation(
    change:number,
    baseOfDenominations:Base,
    changeUsed:Denomination[],
    changeInDrawer:Denomination[],
    getNewChangeInDrawer:GetNewChangeInDrawer,
    getTableOfChange:GetTableOfChange,
    getTableOfDueCount:GetTableOfDueCount,
    getReminderFromChangeTable:GetReminderFromChangeTable
):void
{
    let reminder = getReminderFromChangeTable(change, baseOfDenominations, changeUsed, changeInDrawer, getNewChangeInDrawer, getTableOfChange, getTableOfDueCount);
    while (reminder > 0)
    {
        reminder = getReminderFromChangeTable(reminder, baseOfDenominations, changeUsed, changeInDrawer, getNewChangeInDrawer, getTableOfChange, getTableOfDueCount)
    }
}

export function toDisplay(
    totalOfChangeInDrawer:number,
    totalOfTableOfChangeDue:number,
    cash:number,
    change:number,
    display:HTMLDivElement,
    price:number,
    statusMsgs:string[],
    isIndividualCountOfChangeSufficient:IsIndividualCountOfChangeSufficient,
    baseOfDenominations: Base,
    changeInDrawer: Denomination[],
    getTableOfChange: GetTableOfChange,
    getTableOfDueCount: GetTableOfDueCount,
    makeChangeOperation:MakeChangeOperation,
    changeUsed: Denomination[],
    getNewChangeInDrawer: GetNewChangeInDrawer,
    getReminderFromChangeTable: GetReminderFromChangeTable
):void
{
    if (cash < price)
    {
        alert("Customer does not have enough money to purchase the item");
    }
    else if (cash === price)
    {
        display.innerHTML = `${statusMsgs[0]}`;
    }
    else if (cash > price)
    {
        if (totalOfTableOfChangeDue && totalOfChangeInDrawer > change) {
            if (isIndividualCountOfChangeSufficient(change, baseOfDenominations, changeInDrawer, getTableOfChange, getTableOfDueCount)) {
                makeChangeOperation(change, baseOfDenominations, changeUsed, changeInDrawer, getNewChangeInDrawer, getTableOfChange, getTableOfDueCount, getReminderFromChangeTable);
                let displayChange = "";
                for (let row of changeUsed) {
                    displayChange += row[0] + ":$" + row[1] + "<br/>"
                }
                display.innerHTML = `${statusMsgs[3]}<br/>${displayChange}`;
            } else {
                display.innerHTML = `${statusMsgs[1]}`;
            }
        } else if (totalOfTableOfChangeDue && totalOfChangeInDrawer == change) {
            makeChangeOperation(change, baseOfDenominations, changeUsed, changeInDrawer, getNewChangeInDrawer, getTableOfChange, getTableOfDueCount, getReminderFromChangeTable);
            let displayChange = "";
            for (let row of changeUsed) {
                displayChange += row[0] + ":$" + row[1] + "<br/>"
            }
            display.innerHTML = `${statusMsgs[2]}<br/>${displayChange}`;
        } else if (totalOfChangeInDrawer < change || change > totalOfTableOfChangeDue) {
            display.innerHTML = `${statusMsgs[1]}`;
        }
    }
}

// export function main():void
// {
//     let cashEntry = Number(cash.value);
//     let changeDue = Number((cashEntry - price).toFixed(2));
//     let totalOfChangeInDrawer = Number(tableTotal(changeInDrawer).toFixed(2));
//     let totalOfTableOfChangeDue = changeCountOk();

//     display.innerHTML = "";
//     changeUsed = [];

//     toDisplay(cashEntry);
// }
