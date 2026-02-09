/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CommonLang } from '@apps/common';
import { langColumnsConfig, LangService } from '@apps/common/lang';
import {
  Action,
  ActionService,
  GridData,
  GridFiltersStorageService,
  gridQueryHandler,
  GridStateService,
} from '@aurora';

export const langPaginationResolver: ResolveFn<GridData<CommonLang>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const actionService = inject(ActionService);
  const gridFiltersStorageService = inject(GridFiltersStorageService);
  const gridStateService = inject(GridStateService);
  const langService = inject(LangService);

  actionService.action({
    id: 'common::lang.list.view',
    isViewAction: true,
  });

  const gridId = 'common::lang.list.mainGridList';
  gridStateService.setPaginationActionId(
    gridId,
    'common::lang.list.pagination',
  );
  gridStateService.setExportActionId(gridId, 'common::lang.list.export');

  return langService.pagination({
    query: gridQueryHandler({
      gridFiltersStorageService,
      gridStateService,
      gridId,
      columnsConfig: langColumnsConfig(),
    }),
  });
};

export const langNewResolver: ResolveFn<Action> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const actionService = inject(ActionService);

  return actionService.action({
    id: 'common::lang.detail.new',
    isViewAction: true,
  });
};

export const langEditResolver: ResolveFn<{
  object: CommonLang;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const actionService = inject(ActionService);
  const langService = inject(LangService);

  actionService.action({
    id: 'common::lang.detail.edit',
    isViewAction: true,
  });

  return langService.findById({
    id: route.paramMap.get('id'),
  });
};
