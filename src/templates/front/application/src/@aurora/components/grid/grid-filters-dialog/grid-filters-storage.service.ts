import { Injectable, OnDestroy } from '@angular/core';
import { log, ColumnFilterStorage, SessionService, GridState } from '@aurora';
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
                if (data) this.columnFiltersStorageSubject$.next(data[this.nameStorage]);
            });
    }

    ngOnDestroy(): void
    {
        this.unsubscribeAll$.next();
        this.unsubscribeAll$.complete();
    }

    setColumnFilterState(id: string, gridState: GridState): void
    {
        // get current column filters config storage
        const columnFiltersStorage = this.columnFiltersStorageSubject$.value ? this.columnFiltersStorageSubject$.value : {};

        const columnFilterStorage = {
            id,
            gridState,
        };

        // set QueryStatement with id, to identify which grid the filters belongs to
        columnFiltersStorage[columnFilterStorage.id] = columnFilterStorage;

        this.columnFiltersChangeSubject$.next(columnFilterStorage);

        // save all column filters in session
        this.sessionService.updateSession(this.nameStorage, columnFiltersStorage);

        log('[DEBUG] Set column filter: ', columnFilterStorage);
    }

    getColumnFilterState(id: string): GridState
    {
        // get current column filters config storage
        const columnFiltersStorage = this.columnFiltersStorageSubject$.value;

        // set QueryStatement with id, to identify which grid the filters belongs to
        return columnFiltersStorage && columnFiltersStorage[id] ? columnFiltersStorage[id]?.gridState : null;
    }
}
