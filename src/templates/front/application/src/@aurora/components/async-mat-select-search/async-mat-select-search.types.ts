import { WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GridColumnFilter } from '@aurora';

export interface AsyncMatSelectSearchState<T>
{
    page: {
        pageIndex: number;
        pageSize : number;
    };
    paginationPageIndex: number;
    columnFilters      : GridColumnFilter[];
    currentCount       : number;
    itemsToShow        : T[];
    foundItemsToShow   : T[];
    itemFilterCtrl     : FormControl;
    selectedItems      : WritableSignal<Set<T>>;
    filteredItems      : WritableSignal<Set<T>>;
    isLoading          : WritableSignal<boolean>;
    keyword            : string;
}