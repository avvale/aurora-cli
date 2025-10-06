import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SortDirection } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Action, Operator } from '@aurora';
import { BehaviorSubject } from 'rxjs';

export interface ColumnConfig
{
    type: ColumnDataType;
    searchComponent?: SearchComponentType;
    field?: string;
    searchableField?: string;
    searchableFieldType?: ColumnDataType;
    translation?: string;
    hidden?: boolean;
    sort?: string | string[];
    filterable?: boolean;       // field available to filter with columns filters
    searchable?: boolean;       // field available to search with general search
    isUnaccent?: boolean;       // field available to search with unaccent search on global list search
    headerClass?: string | string[];
    bodyClass?: string | string[];
    sticky?: boolean;
    actions?: (row: any) => ColumnConfigAction[];
    transform?: (row: any) => any;
    translationIconColor?: (row: any) => string;
    fieldValues?: () => { key: string; value: string; }[];
    meta?: any;
}

export interface ColumnConfigAction extends Action
{
    iconFontSet?: string;
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
    ARRAY = 'ARRAY',
    BOOLEAN = 'BOOLEAN',
    CHECKBOX = 'CHECKBOX',
    DATE = 'DATE',
    DRAG_AND_DROP= 'DRAG_AND_DROP',
    ENUM = 'ENUM',
    JSONB = 'JSONB',
    NUMBER = 'NUMBER',
    STRING = 'STRING',
    TIMESTAMP = 'TIMESTAMP',
    TRANSLATIONS_MENU = 'TRANSLATIONS_MENU',
    UUID = 'UUID',
}

export interface ColumnFilterStorage
{
    scope: string; // id of grid where apply filter
    columnFilters: GridColumnFilter[];
}

export enum ExportFormat
{
    EXCEL = 'xlsx',
    CSV = 'csv',
    HTML = 'html',
}

export interface ExportGridState
{
    gridState: GridState;
    format: ExportFormat;
}

export interface FilterDialogResponse
{
   columnFilters: GridColumnFilter[];
}

export type FilterOperator = Operator.eq | Operator.ne | Operator.startsWith | Operator.endsWith | Operator.substring | Operator.gt | Operator.gte | Operator.lt | Operator.lte | Operator.contains | Operator.contained | Operator.iLike | Operator.notILike | Operator.overlap;

export interface FilterCriteriaOperator
{
   operator            : FilterOperator;
   translation         : string;
   searchComponentTypes: SearchComponentType[];
}

export interface GridActionMenuMessages
{
    edit?: BehaviorSubject<string>;
    delete?: BehaviorSubject<string>;
}

export interface GridColumnFilter
{
    id: string;
    field: string;
    type: ColumnDataType;
    searchableField?: string;
    searchComponent?: SearchComponentType;
    operator: FilterOperator;
    value: string | number | string[] | number[];
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
    actions?: BehaviorSubject<string>;
    AND?: BehaviorSubject<string>;
    clearFilters?: BehaviorSubject<string>;
    clickAndDragInfo?: BehaviorSubject<string>;
    columns?: BehaviorSubject<string>;
    field?: BehaviorSubject<string>;
    filter?: BehaviorSubject<string>;
    find?: BehaviorSubject<string>;
    noData?: BehaviorSubject<string>;
    noResultsFound?: BehaviorSubject<string>;
    operator?: BehaviorSubject<string>;
    OR?: BehaviorSubject<string>;
    pleaseSelectField?: BehaviorSubject<string>;
    resetColumnsConfig?: BehaviorSubject<string>;
    search?: BehaviorSubject<string>;
    selectedOptions?: BehaviorSubject<string>;
    translations?: BehaviorSubject<string>;
    value?: BehaviorSubject<string>;
}

export interface GridOperatorMessages
{
    contains?: BehaviorSubject<string>;
    containsAny?: BehaviorSubject<string>;
    endsWith?: BehaviorSubject<string>;
    equals?: BehaviorSubject<string>;
    greaterThan?: BehaviorSubject<string>;
    greaterThanEqual?: BehaviorSubject<string>;
    lessThan?: BehaviorSubject<string>;
    lessThanEqual?: BehaviorSubject<string>;
    mustContain?: BehaviorSubject<string>;
    notEquals?: BehaviorSubject<string>;
    startsWith?: BehaviorSubject<string>;
}

export interface GridPaginatorMessages
{
    firstPageLabel?: BehaviorSubject<string>;
    itemsPerPageLabel?: BehaviorSubject<string>;
    lastPageLabel?: BehaviorSubject<string>;
    nextPageLabel?: BehaviorSubject<string>;
    ofLabel?: BehaviorSubject<string>;
    previousPageLabel?: BehaviorSubject<string>;
}

export interface GridPageState
{
    length?: number;
    pageIndex?: number;
    pageSize?: number;
}

export interface GridSearchState
{
    value?: string;
    isOpen?: boolean;
}

export interface GridSortState
{
    active?: string;
    direction?: SortDirection;
}

export interface GridState
{
    columnsConfig?: ColumnConfig[];
    columnFilters?: GridColumnFilter[];
    search?: GridSearchState;
    sort?: GridSortState;
    page?: GridPageState;
}

export enum SearchComponentType
{
    ASYNC_MULTIPLE_SELECT = 'ASYNC_MULTIPLE_SELECT',
    ASYNC_SELECT = 'ASYNC_SELECT',
    CHECKBOX = 'CHECKBOX',
    CHIPS = 'CHIPS',
    DATEPICKER = 'DATEPICKER',
    DATETIMEPICKER = 'DATETIMEPICKER',
    MULTIPLE_SELECT = 'MULTIPLE_SELECT',
    NUMBER = 'NUMBER',
    SELECT = 'SELECT',
    TEXT = 'TEXT',
    TIMEPICKER = 'TIMEPICKER',
}
