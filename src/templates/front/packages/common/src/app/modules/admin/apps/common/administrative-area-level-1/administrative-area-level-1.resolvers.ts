/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CommonAdministrativeAreaLevel1 } from '@apps/common';
import {
  administrativeAreaLevel1ColumnsConfig,
  AdministrativeAreaLevel1Service,
} from '@apps/common/administrative-area-level-1';
import {
  Action,
  ActionService,
  GridData,
  GridFiltersStorageService,
  gridQueryHandler,
  GridStateService,
} from '@aurora';

export const administrativeAreaLevel1PaginationResolver: ResolveFn<
  GridData<CommonAdministrativeAreaLevel1>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const actionService = inject(ActionService);
  const gridFiltersStorageService = inject(GridFiltersStorageService);
  const gridStateService = inject(GridStateService);
  const administrativeAreaLevel1Service = inject(
    AdministrativeAreaLevel1Service,
  );

  actionService.action({
    id: 'common::administrativeAreaLevel1.list.view',
    isViewAction: true,
  });

  const gridId = 'common::administrativeAreaLevel1.list.mainGridList';
  gridStateService.setPaginationActionId(
    gridId,
    'common::administrativeAreaLevel1.list.pagination',
  );
  gridStateService.setExportActionId(
    gridId,
    'common::administrativeAreaLevel1.list.export',
  );

  return administrativeAreaLevel1Service.pagination({
    query: gridQueryHandler({
      gridFiltersStorageService,
      gridStateService,
      gridId,
      columnsConfig: administrativeAreaLevel1ColumnsConfig(),
    }),
    constraint: {
      include: [
        {
          association: 'country',
          include: [
            {
              association: 'countryI18n',
            },
          ],
        },
      ],
    },
  });
};

export const administrativeAreaLevel1NewResolver: ResolveFn<Action> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const actionService = inject(ActionService);

  return actionService.action({
    id: 'common::administrativeAreaLevel1.detail.new',
    isViewAction: true,
  });
};

export const administrativeAreaLevel1EditResolver: ResolveFn<{
  object: CommonAdministrativeAreaLevel1;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const actionService = inject(ActionService);
  const administrativeAreaLevel1Service = inject(
    AdministrativeAreaLevel1Service,
  );

  actionService.action({
    id: 'common::administrativeAreaLevel1.detail.edit',
    isViewAction: true,
  });

  return administrativeAreaLevel1Service.findById({
    id: route.paramMap.get('id'),
  });
};
