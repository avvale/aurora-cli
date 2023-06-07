import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';
import { Observable } from 'rxjs';
import { CommonCountry } from '../common.types';
import { countryColumnsConfig } from './country.columns-config';
import { CountryService } from './country.service';

@Injectable({
    providedIn: 'root',
})
export class CountryPaginationResolver implements Resolve<GridData<CommonCountry>>
{
    constructor(
        private readonly actionService: ActionService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly countryService: CountryService,
    ) {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<GridData<CommonCountry>>
    {
        this.actionService.action({
            id          : 'common::country.list.view',
            isViewAction: true,
        });

        const gridId = 'common::country.list.mainGridList';
        this.gridStateService.setPaginationActionId(gridId, 'common::country.list.pagination');
        this.gridStateService.setExportActionId(gridId, 'common::country.list.export');

        return this.countryService.pagination({
            query: QueryStatementHandler
                .init({ columnsConfig: countryColumnsConfig })
                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(gridId))
                .setSort(this.gridStateService.getSort(gridId))
                .setPage(this.gridStateService.getPage(gridId))
                .setSearch(this.gridStateService.getSearchState(gridId))
                .getQueryStatement(),
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class CountryNewResolver implements Resolve<Action>
{
    constructor(
		private readonly actionService: ActionService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Action
    {
        return this.actionService.action({
            id          : 'common::country.detail.new',
            isViewAction: true,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class CountryEditResolver implements Resolve<{
	object: CommonCountry;
}>
{
    constructor(
		private readonly actionService: ActionService,
		private readonly countryService: CountryService,
    )
    {}

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<{
		object: CommonCountry;
    }>
    {
        this.actionService.action({
            id          : 'common::country.detail.edit',
            isViewAction: true,
        });

        return this.countryService.findById({
            id: route.paramMap.get('id'),
        });
    }
}
