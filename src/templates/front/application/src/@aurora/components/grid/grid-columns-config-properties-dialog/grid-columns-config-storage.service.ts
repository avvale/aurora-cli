import { Injectable, OnDestroy } from '@angular/core';
import { log, ColumnConfigStorage } from '@aurora';
import { BehaviorSubject, combineLatest, from, lastValueFrom, map, Observable, Subject, takeUntil } from 'rxjs';
import { ColumnConfig } from '..';
import { UserDataStorageService } from '../../user-data-storage';
import { Utils } from '../../../functions/utils';
import cloneDeep from 'lodash-es/cloneDeep';

@Injectable({
    providedIn: 'root',
})
export class GridColumnsConfigStorageService implements OnDestroy
{
    private nameStorage = 'columnsConfigStorage';

    columnsConfigStorageSubject$: BehaviorSubject<{ [key:string]: ColumnConfigStorage; }> = new BehaviorSubject({});

    get columnsConfigStorage$(): Observable<{ [key:string]: ColumnConfigStorage; }>
    {
        return this.columnsConfigStorageSubject$.asObservable();
    }

    private columnsConfigChangeSubject$: Subject<ColumnConfigStorage | null> = new Subject<null>();

    get columnsConfigChange$(): Observable<ColumnConfigStorage>
    {
        return this.columnsConfigChangeSubject$.asObservable();
    }

    // subject to destroy all subscriptions in ngOnDestroy life cycle
    unsubscribeAll$: Subject<void> = new Subject();

    constructor(
        private userDataStorageService: UserDataStorageService,
    )
    {
        this.userDataStorageService
            .data$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(data =>
            {
                if (data) this.columnsConfigStorageSubject$.next(data[this.nameStorage]);
            });
    }

    ngOnDestroy(): void
    {
        this.unsubscribeAll$.next();
        this.unsubscribeAll$.complete();
    }

    async setColumnsConfig(id: string, columnsConfig: ColumnConfig[], originColumnsConfig: ColumnConfig[]): Promise<void>
    {
        // get current columns config storage
        const columnsConfigStorage = this.columnsConfigStorageSubject$.value;

        const columnConfigStorage = {
            id,
            hash: await this.createColumnsConfigHash(originColumnsConfig), // create hash of the original config columns to verify future changes
            columnsConfig,
        };

        // set ColumnConfigStorage with id, to identify which grid the configuration belongs to
        columnsConfigStorage[columnConfigStorage.id] = columnConfigStorage;

        this.columnsConfigChangeSubject$.next(columnConfigStorage);

        // save all columns config in user record database
        await lastValueFrom(this.userDataStorageService.updateUserData(this.nameStorage, columnsConfigStorage));
    }

    getColumnsConfig(id: string, originColumnsConfig: ColumnConfig[]): Observable<ColumnConfig[]>
    {
        return combineLatest(
            {
                columnsConfigStorage   : this.columnsConfigStorage$,
                originColumnsConfigHash: from(this.createColumnsConfigHash(originColumnsConfig)),
            })
            .pipe(
                takeUntil(this.unsubscribeAll$),
                map(response =>
                {
                    const columnConfigStorage = response.columnsConfigStorage[id];

                    // we use spread operator to break the origin config reference to avoid changing changes
                    if (!columnConfigStorage) return cloneDeep(originColumnsConfig);

                    if (response.originColumnsConfigHash !== columnConfigStorage.hash)
                    {
                        log('[DEBUG] columns config changed in :', id, originColumnsConfig);

                        // we use spread operator to break the origin config reference to avoid changing changes
                        const newColumnsConfigStorage = this.addChangesToColumnsConfig(columnConfigStorage.columnsConfig, cloneDeep(originColumnsConfig));
                        this.setColumnsConfig(id, newColumnsConfigStorage, originColumnsConfig);

                        return newColumnsConfigStorage;
                    }

                    return this.addFunctionsToColumnsConfig(columnConfigStorage.columnsConfig, originColumnsConfig);
                }),
            );
    }

    // data from database is unserialize, this action delete functions from array object, we need add the original functions
    private addFunctionsToColumnsConfig(columnConfigStorage: ColumnConfig[], originColumnsConfig: ColumnConfig[]): ColumnConfig[]
    {
        for (const [index, columnConfig] of originColumnsConfig.entries())
        {
            if (columnConfig.actions)   columnConfigStorage[index].actions   = columnConfig.actions;
            if (columnConfig.transform) columnConfigStorage[index].transform = columnConfig.transform;
        }

        return columnConfigStorage;
    }

    private addChangesToColumnsConfig(columnConfigStorage: ColumnConfig[], originColumnsConfig: ColumnConfig[]): ColumnConfig[]
    {
        // sort array accord columnConfigStorage
        originColumnsConfig.sort(
            (a, b) =>
            {
                // if the field does not exist we place it in the new component
                if (columnConfigStorage.map(columnConfig => columnConfig.field).indexOf(a.field) === -1) return 1;

                return columnConfigStorage
                    .map(columnConfig => columnConfig.field).indexOf(a.field) -
                columnConfigStorage
                    .map(columnConfig => columnConfig.field).indexOf(b.field);
            },
        );

        // set hidden properties over new origin array
        const columnsConfig = originColumnsConfig.map(originColumnConfig =>
        {
            const columnConfigStorageFound = columnConfigStorage.find(columnConfig => columnConfig.field === originColumnConfig.field);
            if (columnConfigStorageFound) originColumnConfig.hidden = columnConfigStorageFound.hidden;
            return originColumnConfig;
        });

        return columnsConfig;
    }

    private async createColumnsConfigHash(columnsConfig: ColumnConfig[]): Promise<string>
    {
        return await Utils.encrypt(JSON.stringify(columnsConfig));
    }
}