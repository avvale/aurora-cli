import { CommonCountry } from '../common.types';
import { countryColumnsConfig } from './country.columns-config';
import { CountryService } from './country.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, CoreCurrentLangService, CoreLang, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler, SessionService } from '@aurora';

export const countryPaginationResolver: ResolveFn<GridData<CommonCountry>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const countryService = inject(CountryService);
    const sessionService = inject(SessionService);

    actionService.action({
        id          : 'common::country.list.view',
        isViewAction: true,
    });

    const gridId = 'common::country.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'common::country.list.pagination');
    gridStateService.setExportActionId(gridId, 'common::country.list.export');

    return countryService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: countryColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
        headers: {
            'Content-Language': sessionService.get('fallbackLang')[sessionService.get('searchKeyLang')],
        },
    });
};

export const countryNewResolver: ResolveFn<Action | { object: CommonCountry; }> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);
	const coreCurrentLangService = inject(CoreCurrentLangService);
	const countryService = inject(CountryService);
	const sessionService = inject(SessionService);

    const action = actionService.action({
        id          : 'common::country.detail.new',
        isViewAction: true,
    });

    // set current lang
    coreCurrentLangService.setCurrentLang(
        sessionService
            .get<CoreLang[]>('langs')
            .find((lang: CoreLang) => lang[sessionService.get('searchKeyLang')] === route.paramMap.get('langId')) ||
        sessionService.get<CoreLang>('fallbackLang'),
    );

    if (route.paramMap.get('id') && route.paramMap.get('langId'))
    {
        return countryService
            .findById({
                id        : route.paramMap.get('id'),
                constraint: {
                    include: [{
                        association: 'countryI18n',
                        required   : true,
                        where      : {
                            // retrieves object with the fallback lang to have
                            // a guide to the texts to be translated
                            langId: sessionService.get('fallbackLang').id,
                        },
                    }],
                },
                headers: {
                    'Content-Language': route.paramMap.get('langId'),
                },
            });
    }

    return action;
};

export const countryEditResolver: ResolveFn<{
	object: CommonCountry;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
	const actionService = inject(ActionService);
	const coreCurrentLangService = inject(CoreCurrentLangService);
	const countryService = inject(CountryService);
	const sessionService = inject(SessionService);

    actionService.action({
        id          : 'common::country.detail.edit',
        isViewAction: true,
    });

    // set current lang
    coreCurrentLangService.setCurrentLang(
        sessionService
            .get<CoreLang[]>('langs')
            .find((lang: CoreLang) => lang[sessionService.get('searchKeyLang')] === route.paramMap.get('langId')),
    );

    return countryService
        .findById({
            id: route.paramMap.get('id'),
            headers: {
                'Content-Language': route.paramMap.get('langId'),
            },
        });
};
