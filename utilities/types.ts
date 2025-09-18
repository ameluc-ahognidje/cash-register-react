export type Denomination = [string, number];
export type Base = {
    [key:  string]: number
};
export type GetReminderFromTableOfChangesDues = (
    P_changeUsed: Denomination[],
    P_changeDue: number,
    P_baseOfDenominations: Base,
    P_changeInDrawer: Denomination[],
    P_getTableOfChangesDues: GetTableOfChangesDues,
    P_getTableOfMaxDenominationCountDue: GetTableOfMaxDenominationCountDue,
    P_makeNewDrawer: MakeNewDrawer
) => number;
export type GetTableOfChangesDues = (
    P_changeDue: number,
    P_baseOfDenominations: Base,
    P_changeInDrawer: Denomination[]
) => Denomination[];
export type GetTableOfMaxDenominationCountDue = (
    P_changeDue: number,
    baseOfDenominations: Base,
    P_tableOfChangeDue: Denomination[]
) => Denomination;
export type GetTotalOfTable = (
    P_tableOfChanges: Denomination[]
) => number;
export type GetTotalOfTableOfChangesDue = (
    P_price: number,
    P_cash: number,
    P_baseOfDenominations: Base,
    P_changeInDrawer: Denomination[],
    P_getTableOfChangesDues: GetTableOfChangesDues,
    P_getTotalOfTable: GetTotalOfTable
) => number;
export type IsEachCountOfChangesEnough = (
    P_changeDue: number,
    P_baseOfDenominations: Base,
    P_changeInDrawer: Denomination[],
    P_getTableOfChangesDues: GetTableOfChangesDues,
    P_getTableOfMaxDenominationCountDue: GetTableOfMaxDenominationCountDue
) => boolean;
export type MakeChangeOperation = (
    P_changeUsed: Denomination[],
    P_changeDue: number,
    P_baseOfDenominations: Base,
    P_changeInDrawer: Denomination[],
    P_getReminderFromTableOfChangesDues: GetReminderFromTableOfChangesDues,
    P_getTableOfChangesDues: GetTableOfChangesDues,
    P_getTableOfMaxDenominationCountDue: GetTableOfMaxDenominationCountDue,
    P_makeNewDrawer: MakeNewDrawer
) => void;
export type MakeNewDrawer = (
    P_maxAmountDue: number,
    P_tableOfMaxDenominationCountDue: Denomination,
    P_changeInDrawer: Denomination[]
) => Denomination[];
