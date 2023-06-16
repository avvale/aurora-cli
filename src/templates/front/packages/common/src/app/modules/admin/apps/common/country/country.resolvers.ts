import { CommonCountry } from '../common.types';
import { countryColumnsConfig } from './country.columns-config';
import { CountryService } from './country.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, CoreCurrentLangService, CoreLang, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler, SessionService } from '@aurora';
import { Observable } from 'rxjs';

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
        private readonly sessionService: SessionService,
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
            headers: {
                'Content-Language': this.sessionService.get('fallbackLang')[this.sessionService.get('searchKeyLang')],
            },
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class CountryNewResolver implements Resolve<Action | { object: CommonCountry; }>
{
    constructor(
		private readonly actionService: ActionService,
		private readonly coreCurrentLangService: CoreCurrentLangService,
		private readonly countryService: CountryService,
		private readonly sessionService: SessionService,
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
    ): Action | Observable<{ object: CommonCountry; }>
    {
        const action = this.actionService.action({
            id          : 'common::country.detail.new',
            isViewAction: true,
        });

        // set current lang
        this.coreCurrentLangService.setCurrentLang(
            this.sessionService
                .get<CoreLang[]>('langs')
                .find((lang: CoreLang) => lang[this.sessionService.get('searchKeyLang')] === route.paramMap.get('langId')) ||
            this.sessionService.get<CoreLang>('fallbackLang'),
        );

        if (route.paramMap.get('id') && route.paramMap.get('langId'))
        {
            return this.countryService
                .findById({
                    id        : route.paramMap.get('id'),
                    constraint: {
                        include: [{
                            association: 'countryI18n',
                            required   : true,
                            where      : {
                                // retrieves object with the fallback lang to have
                                // a guide to the texts to be translated
                                langId: this.sessionService.get('fallbackLang').id,
                            },
                        }],
                    },
                    headers: {
                        'Content-Language': route.paramMap.get('langId'),
                    },
                });
        }

        return action;
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
		private readonly coreCurrentLangService: CoreCurrentLangService,
		private readonly countryService: CountryService,
		private readonly sessionService: SessionService,
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

        // set current lang
        this.coreCurrentLangService.setCurrentLang(
            this.sessionService
                .get<CoreLang[]>('langs')
                .find((lang: CoreLang) => lang[this.sessionService.get('searchKeyLang')] === route.paramMap.get('langId')),
        );

        return this.countryService
            .findById({
                id: route.paramMap.get('id'),
                headers: {
                    'Content-Language': route.paramMap.get('langId'),
                },
            });
    }
}
