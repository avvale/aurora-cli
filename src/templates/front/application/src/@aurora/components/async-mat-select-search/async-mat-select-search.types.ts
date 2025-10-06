import { WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GridColumnFilter } from '@aurora';

export interface AsyncMatSelectSearchState<T, E>
{
    page: {
        pageIndex: number;
        pageSize : number;
    };
    paginationPageIndex: number;
    columnFilters      : GridColumnFilter[];
    currentCount       : number;
    itemsToShow        : E[];
    foundItemsToShow   : E[];
    itemFilterCtrl     : FormControl;
    selectedItems      : WritableSignal<Map<T, E>>;
    filteredItems      : WritableSignal<Map<T, E>>;
    isLoading          : WritableSignal<boolean>;
    keyword            : string;
    indexKey           : string;
    valueKey           : string;
}