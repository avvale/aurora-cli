/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CommonAdministrativeAreaLevel3 } from '@apps/common';
import {
  administrativeAreaLevel3ColumnsConfig,
  AdministrativeAreaLevel3Service,
} from '@apps/common/administrative-area-level-3';
import {
  Action,
  ActionService,
  GridData,
  GridFiltersStorageService,
  gridQueryHandler,
  GridStateService,
} from '@aurora';

export const administrativeAreaLevel3PaginationResolver: ResolveFn<
  GridData<CommonAdministrativeAreaLevel3>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const actionService = inject(ActionService);
  const gridFiltersStorageService = inject(GridFiltersStorageService);
  const gridStateService = inject(GridStateService);
  const administrativeAreaLevel3Service = inject(
    AdministrativeAreaLevel3Service,
  );

  actionService.action({
    id: 'common::administrativeAreaLevel3.list.view',
    isViewAction: true,
  });

  const gridId = 'common::administrativeAreaLevel3.list.mainGridList';
  gridStateService.setPaginationActionId(
    gridId,
    'common::administrativeAreaLevel3.list.pagination',
  );
  gridStateService.setExportActionId(
    gridId,
    'common::administrativeAreaLevel3.list.export',
  );

  return administrativeAreaLevel3Service.pagination({
    query: gridQueryHandler({
      gridFiltersStorageService,
      gridStateService,
      gridId,
      columnsConfig: administrativeAreaLevel3ColumnsConfig(),
    }),
  });
};

export const administrativeAreaLevel3NewResolver: ResolveFn<Action> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const actionService = inject(ActionService);

  return actionService.action({
    id: 'common::administrativeAreaLevel3.detail.new',
    isViewAction: true,
  });
};

export const administrativeAreaLevel3EditResolver: ResolveFn<{
  object: CommonAdministrativeAreaLevel3;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const actionService = inject(ActionService);
  const administrativeAreaLevel3Service = inject(
    AdministrativeAreaLevel3Service,
  );

  actionService.action({
    id: 'common::administrativeAreaLevel3.detail.edit',
    isViewAction: true,
  });

  return administrativeAreaLevel3Service.findById({
    id: route.paramMap.get('id'),
  });
};
