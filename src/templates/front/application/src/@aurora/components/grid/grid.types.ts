import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Action, Operator } from '@aurora';
import { BehaviorSubject } from 'rxjs';

export interface ColumnConfig
{
    type: ColumnDataType;
    field?: string;
    translation?: string;
    hidden?: boolean;
    sort?: string | string[];
    filterable?: boolean;
    headerClass?: string | string[];
    bodyClass?: string | string[];
    sticky?: boolean;
    actions?: (row: any) => ColumnConfigAction[];
    transform?: (row: any) => any;
}

export interface ColumnConfigAction extends Action
{
    icon?: string;
    svgIcon?: string;
    translation?: string;
    badge?: {
        hidden?: boolean;
        color?: 'primary' | 'accent' | 'warn' ;
        label?: string;
    };
}

export interface ColumnsConfigChange
{
    columnsConfig: ColumnConfig[];
    event: MatCheckboxChange | CdkDragDrop<string[]>;
}

export enum ColumnDataType
{
    ACTIONS = 'ACTIONS',
    BOOLEAN = 'BOOLEAN',
    CHECKBOX = 'CHECKBOX',
    DATE = 'DATE',
    DRAG_AND_DROP= 'DRAG_AND_DROP',
    NUMBER = 'NUMBER',
    STRING = 'STRING',
    TRANSLATIONS_MENU = 'TRANSLATIONS_MENU',
}

export interface ColumnFilterStorage
{
    id: string; // id of grid where apply filter
    gridState: GridState;
}

export type FilterColumnDataType = ColumnDataType.STRING | ColumnDataType.NUMBER | ColumnDataType.DATE;

export interface FilterDialogResponse
{
   columnFilters: GridColumnFilter[];
}

export type FilterOperator = Operator.eq | Operator.ne | Operator.startsWith | Operator.endsWith | Operator.substring | Operator.gt | Operator.gte | Operator.lt | Operator.lte;

export interface FilterCriteriaOperator
{
   operator   : FilterOperator;
   translation: string;
   types      : FilterColumnDataType[];
}

export interface GridActionsMenuMessages
{
    [key: string]: string;
}

export interface GridColumnFilter
{
    id: string;
    field: string;
    type: ColumnDataType;
    operator: FilterOperator;
    value: string | number;
}

export type GridCustomHeaderPosition = 'left' | 'right' | 'beforeGridButtons';

export interface GridData<T = any>
{
    /**
     * The total number of records filtered.
     */
    count: number;

    /**
     * The total number of records that are available.
     */
    total: number;

    /**
     * The data that will be rendered by the Grid as an array.
     */
    rows: T[];
}

export interface GridMessages
{
    actions: BehaviorSubject<string>;
    AND: BehaviorSubject<string>;
    clearFilters: BehaviorSubject<string>;
    clickAndDragInfo: BehaviorSubject<string>;
    columns: BehaviorSubject<string>;
    field: BehaviorSubject<string>;
    filter: BehaviorSubject<string>;
    noData: BehaviorSubject<string>;
    operator: BehaviorSubject<string>;
    OR: BehaviorSubject<string>;
    pleaseSelectField: BehaviorSubject<string>;
    resetColumnsConfig: BehaviorSubject<string>;
    translations: BehaviorSubject<string>;
    value: BehaviorSubject<string>;
}

export interface GridOperatorsMessages
{
    contains: string;
    endsWith: string;
    equals: string;
    greaterThan: string;
    greaterThanEqual: string;
    lessThan: string;
    lessThanEqual: string;
    notEquals: string;
    startsWith: string;
}

export interface GridPaginatorMessages
{
    firstPageLabel: string;
    itemsPerPageLabel: string;
    lastPageLabel: string;
    nextPageLabel: string;
    ofLabel: string;
    previousPageLabel: string;
}

export interface GridState
{
    columnFilters?: GridColumnFilter[];
    count?: number;
    limit?: number;
    offset?: number;
    order?: any;
}
