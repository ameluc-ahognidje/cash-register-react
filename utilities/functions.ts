import type { Dispatch } from "react";
import type {
    Base,
    Denomination,
    GetReminderFromTableOfChangesDues,
    GetTableOfChangesDues,
    GetTableOfMaxDenominationCountDue,
    GetTotalOfTable,
    IsEachCountOfChangesEnough,
    MakeChangeOperation,
    MakeNewDrawer
} from "./types.ts";


export function displayResult(
    P_baseOfDenominations: Base,
    P_statusMessages: string[],
    P_changeInDrawer: Denomination[],
    P_changeUsed: Denomination[],
    P_changeDue: number,
    P_price: number,
    P_cash: number,
    P_totalOfChangesInDrawer: number,
    P_totalOfTableOfChangesDues: number,
    P_getReminderFromTableOfChangesDues: GetReminderFromTableOfChangesDues,
    P_getTableOfChangesDues: GetTableOfChangesDues,
    P_getTableOfMaxDenominationCountDue: GetTableOfMaxDenominationCountDue,
    P_isEachCountOfChangesEnough: IsEachCountOfChangesEnough,
    P_makeChangeOperation: MakeChangeOperation,
    P_makeNewDrawer: MakeNewDrawer,
    P_setDisplay: Dispatch<React.SetStateAction<string>>
): void
{
    if (P_cash < P_price)
    {
        alert("Customer does not have enough money to purchase the item");
    }
    else if (P_cash === P_price)
    {
        P_setDisplay(P_statusMessages[0]);
    }
    else
    {
        if (P_totalOfTableOfChangesDues && P_totalOfChangesInDrawer > P_changeDue)
        {
            if (P_isEachCountOfChangesEnough(
                P_changeDue,
                P_baseOfDenominations,
                P_changeInDrawer,
                P_getTableOfChangesDues,
                P_getTableOfMaxDenominationCountDue
            ))
            {
                P_makeChangeOperation(
                    P_changeUsed,
                    P_changeDue,
                    P_baseOfDenominations,
                    P_changeInDrawer,
                    P_getReminderFromTableOfChangesDues,
                    P_getTableOfChangesDues,
                    P_getTableOfMaxDenominationCountDue,
                    P_makeNewDrawer
                );

                let displayChange = "";

                for (let row of P_changeUsed)
                {
                    displayChange += row[0] + ": $" + row[1] + "<br/>";
                }

                P_setDisplay(`${P_statusMessages[3]}<br/>${displayChange}`);
            }
            else
            {
                P_setDisplay(P_statusMessages[1]);
            }
        }
        else if (P_totalOfTableOfChangesDues && P_totalOfChangesInDrawer == P_changeDue)
        {
            P_makeChangeOperation(
                P_changeUsed,
                P_changeDue,
                P_baseOfDenominations,
                P_changeInDrawer,
                P_getReminderFromTableOfChangesDues,
                P_getTableOfChangesDues,
                P_getTableOfMaxDenominationCountDue,
                P_makeNewDrawer
            );

            let displayChange = "";

            for (let row of P_changeUsed)
            {
                displayChange += row[0] + ": $" + row[1] + "<br/>";
            }

            P_setDisplay(`${P_statusMessages[2]}<br/>${displayChange}`);
        }
        else if (P_totalOfChangesInDrawer < P_changeDue || P_changeDue > P_totalOfTableOfChangesDues)
        {
            P_setDisplay(P_statusMessages[1]);
        }
    }
}

export function getReminderFromTableOfChangesDues(
    P_changeUsed: Denomination[],
    P_changeDue: number, P_baseOfDenominations: Base,
    P_changeInDrawer: Denomination[],
    P_getTableOfChangesDues: GetTableOfChangesDues,
    P_getTableOfMaxDenominationCountDue: GetTableOfMaxDenominationCountDue,
    P_makeNewDrawer: MakeNewDrawer
): number
{
    const tableOfChangesDues = P_getTableOfChangesDues(P_changeDue, P_baseOfDenominations, P_changeInDrawer);
    const maxTableDue = P_getTableOfMaxDenominationCountDue(P_changeDue, P_baseOfDenominations, tableOfChangesDues);
    const maxAmountDue = Number((P_baseOfDenominations[maxTableDue[0]] * maxTableDue[1]).toFixed(2));

    P_changeUsed.push([maxTableDue[0], maxAmountDue]);
    P_makeNewDrawer(maxAmountDue, maxTableDue, P_changeInDrawer);

    return Number((P_changeDue - maxAmountDue).toFixed(2));
}

export function getTableOfChangesDues(
    P_changeDue: number,
    P_baseOfDenominations: Base,
    P_changeInDrawer: Denomination[]
): Denomination[]
{
    const tableOfChangeDue: Denomination[] = [];

    for (let [denomination, amount] of P_changeInDrawer)
    {
        if (amount > 0 && P_baseOfDenominations[denomination] <= P_changeDue)
        {
            tableOfChangeDue.push([denomination, amount]);
        }
    }

    return tableOfChangeDue;
}

export function getTableOfMaxDenominationCountDue(
    P_changeDue: number,
    baseOfDenominations: Base,
    P_tableOfChangeDue: Denomination[]
): Denomination
{
    let maxDenominationDue: string = P_tableOfChangeDue[P_tableOfChangeDue.length - 1][0];
    let maxCountDue: number;

    const amountOfDenominationDue1: number = Math.floor(P_changeDue / baseOfDenominations[maxDenominationDue]);
    const amountOfDenominationDue2: number = Math.floor(P_tableOfChangeDue[P_tableOfChangeDue.length - 1][1] / baseOfDenominations[maxDenominationDue]);

    if (amountOfDenominationDue1 <= amountOfDenominationDue2)
    {
        maxCountDue = amountOfDenominationDue1;
    }
    else
    {
        maxCountDue = amountOfDenominationDue2;
    }

    return [ maxDenominationDue, maxCountDue ];
}

export function getTotalOfTable(P_tableOfChanges: Denomination[]): number
{
    let totalOfTable: number = 0;

    P_tableOfChanges.forEach((element: Denomination)=> {
        totalOfTable += element[1];
    });

    return totalOfTable;
}

export function getTotalOfTableOfChangesDue(
    P_price: number,
    P_cash: number,
    P_baseOfDenominations: Base,
    P_changeInDrawer: Denomination[],
    P_getTableOfChangesDues: GetTableOfChangesDues,
    P_getTotalOfTable: GetTotalOfTable
): number
{
    const changeDue = Number((P_cash - P_price).toFixed(2));
    const tableOfChangesDues: Denomination[] = P_getTableOfChangesDues(changeDue, P_baseOfDenominations, P_changeInDrawer);
    const totalOfTableOfChangesDue: number = P_getTotalOfTable(tableOfChangesDues);

    return totalOfTableOfChangesDue;
}

export function isEachCountOfChangesEnough(
    P_changeDue: number,
    P_baseOfDenominations: Base,
    P_changeInDrawer: Denomination[],
    P_getTableOfChangesDues: GetTableOfChangesDues,
    P_getTableOfMaxDenominationCountDue: GetTableOfMaxDenominationCountDue
): boolean
{
    let tableOfChangesDues = P_getTableOfChangesDues(P_changeDue, P_baseOfDenominations, P_changeInDrawer);

    while (P_changeDue > 0 && tableOfChangesDues.length > 1)
    {
        tableOfChangesDues = P_getTableOfChangesDues(P_changeDue, P_baseOfDenominations, P_changeInDrawer);
        const maxTableDue = P_getTableOfMaxDenominationCountDue(P_changeDue, P_baseOfDenominations, tableOfChangesDues);
        const maxAmountDue = Number((P_baseOfDenominations[maxTableDue[0]] * maxTableDue[1]).toFixed(2));
        P_changeDue = Number((P_changeDue - maxAmountDue).toFixed(2));
    }

    return P_changeDue === 0;
}

export function makeChangeOperation(
    P_changeUsed: Denomination[],
    P_changeDue: number,
    P_baseOfDenominations: Base,
    P_changeInDrawer: Denomination[],
    P_getReminderFromTableOfChangesDues: GetReminderFromTableOfChangesDues,
    P_getTableOfChangesDues: GetTableOfChangesDues,
    P_getTableOfMaxDenominationCountDue: GetTableOfMaxDenominationCountDue,
    P_makeNewDrawer: MakeNewDrawer
): void
{
    let reminder: number = P_getReminderFromTableOfChangesDues(
        P_changeUsed,
        P_changeDue,
        P_baseOfDenominations,
        P_changeInDrawer,
        P_getTableOfChangesDues,
        P_getTableOfMaxDenominationCountDue,
        P_makeNewDrawer
    );

    while (reminder > 0)
    {
        reminder = P_getReminderFromTableOfChangesDues(
            P_changeUsed,
            reminder,
            P_baseOfDenominations,
            P_changeInDrawer,
            P_getTableOfChangesDues,
            P_getTableOfMaxDenominationCountDue,
            P_makeNewDrawer
        );
    }
}

export function makeNewDrawer(
    P_maxAmountDue: number,
    P_tableOfMaxDenominationCountDue: Denomination,
    P_changeInDrawer: Denomination[]
): Denomination[]
{
    return P_changeInDrawer.map((row: Denomination)=>
        {
            if (row[0] === P_tableOfMaxDenominationCountDue[0])
            {
                return [row[0], Number((row[1] - P_maxAmountDue).toFixed(2))];
            }
            else
            {
                return row;
            }
        }
    );
}

// export function getTotalOfTableSlim(table: Denomination[]) : number
// {
//     return table.reduce((previousValue: number, currentValue: Denomination)=> previousValue + currentValue[1], 0);
// }
