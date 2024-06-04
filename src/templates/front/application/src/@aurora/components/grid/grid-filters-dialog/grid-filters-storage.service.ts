import { Injectable, OnDestroy } from '@angular/core';
import { log, ColumnFilterStorage, SessionService, GridColumnFilter } from '@aurora';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GridFiltersStorageService implements OnDestroy
{
    private nameStorage = 'columnFilters';

    columnFiltersStorageSubject$: BehaviorSubject<{ [key:string]: ColumnFilterStorage; }> = new BehaviorSubject({});

    get columnFiltersStorage$(): Observable<{ [key:string]: ColumnFilterStorage; }>
    {
        return this.columnFiltersStorageSubject$.asObservable();
    }

    private columnFiltersChangeSubject$: Subject<ColumnFilterStorage | null> = new Subject<null>();

    get columnsConfigChange$(): Observable<ColumnFilterStorage>
    {
        return this.columnFiltersChangeSubject$.asObservable();
    }

    // subject to destroy all subscriptions in ngOnDestroy life cycle
    unsubscribeAll$: Subject<void> = new Subject();

    constructor(
        private sessionService: SessionService,
    )
    {
        this.sessionService
            .data$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(data =>
            {
                if (data && data[this.nameStorage]) this.columnFiltersStorageSubject$.next(data[this.nameStorage]);
            });
    }

    ngOnDestroy(): void
    {
        this.unsubscribeAll$.next();
        this.unsubscribeAll$.complete();
    }

    setColumnFilterState(scope: string, columnFilters: GridColumnFilter[]): void
    {
        // get current column filters config storage
        const columnFiltersStorage = this.columnFiltersStorageSubject$.value ? this.columnFiltersStorageSubject$.value : {};

        const columnFilterStorage = {
            scope,
            columnFilters,
        };

        // set QueryStatement with id, to identify which grid the filters belongs to
        columnFiltersStorage[columnFilterStorage.scope] = columnFilterStorage;

        this.columnFiltersChangeSubject$.next(columnFilterStorage);

        // save all column filters in session
        this.sessionService.set(this.nameStorage, columnFiltersStorage);

        log('[DEBUG] Set column filter: ', columnFilterStorage);
    }

    getColumnFilterState(scope: string): GridColumnFilter[]
    {
        // get current column filters config storage
        const columnFiltersStorage = this.columnFiltersStorageSubject$.value;

        return columnFiltersStorage[scope]?.columnFilters ? columnFiltersStorage[scope].columnFilters : [];
    }

    getColumnFilter(scope: string, field: string): GridColumnFilter | null
    {
        // get current column filters config storage
        const columnFiltersStorage = this.columnFiltersStorageSubject$.value;

        return columnFiltersStorage[scope]?.columnFilters && columnFiltersStorage[scope].columnFilters.find(columnFilter => columnFilter.field === field);
    }
}
