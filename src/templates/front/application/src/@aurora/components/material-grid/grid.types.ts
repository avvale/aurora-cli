import { Operator } from "@aurora/modules";


export interface ActionEvent
{
    action: ColumnConfigAction;
    row?: any;
    event?: PointerEvent;
}

export interface Action
{
    id: string;
    data?: {
        [key: string]: any;
    };
}

export interface ColumnsDialogTranslations
{
    Columns: string;
}

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

export interface GridTranslations
{
    Columns?: string;
    [key: string]: string;
}

export interface ColumnConfig
{
    type: ColumnDataType;
    field?: string;
    translation?: string;
    hidden?: boolean;
    sort?: string | string[];
    filterable?: boolean;
    headerClass?: string | string[];
    sticky?: boolean;
    actions?: (item: any) => ColumnConfigAction[];
}

export interface FilterEvent
{
    [key: string]: {
        [key: string]: Operator[];
    };
}

export interface ColumnListItem
{
    type: string;
    translation: string;
    field: string;
}

export interface ColumnConfigAction
{
    id: string;
    icon: string;
    translation: string;
}

export enum ColumnDataType
{
    ACTIONS,
    DATE,
    NUMBER,
    STRING,
    TRANSLATIONS_MENU
}

export interface PageChangeEvent
{
    count: number;
    offset: number;
    limit: number;
    sort: string | string[];
    order: string;
}