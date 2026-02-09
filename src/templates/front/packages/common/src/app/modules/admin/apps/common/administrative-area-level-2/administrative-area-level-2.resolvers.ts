/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CommonAdministrativeAreaLevel2 } from '@apps/common';
import {
  administrativeAreaLevel2ColumnsConfig,
  AdministrativeAreaLevel2Service,
} from '@apps/common/administrative-area-level-2';
import {
  Action,
  ActionService,
  GridData,
  GridFiltersStorageService,
  gridQueryHandler,
  GridStateService,
} from '@aurora';

export const administrativeAreaLevel2PaginationResolver: ResolveFn<
  GridData<CommonAdministrativeAreaLevel2>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const actionService = inject(ActionService);
  const gridFiltersStorageService = inject(GridFiltersStorageService);
  const gridStateService = inject(GridStateService);
  const administrativeAreaLevel2Service = inject(
    AdministrativeAreaLevel2Service,
  );

  actionService.action({
    id: 'common::administrativeAreaLevel2.list.view',
    isViewAction: true,
  });

  const gridId = 'common::administrativeAreaLevel2.list.mainGridList';
  gridStateService.setPaginationActionId(
    gridId,
    'common::administrativeAreaLevel2.list.pagination',
  );
  gridStateService.setExportActionId(
    gridId,
    'common::administrativeAreaLevel2.list.export',
  );

  return administrativeAreaLevel2Service.pagination({
    query: gridQueryHandler({
      gridFiltersStorageService,
      gridStateService,
      gridId,
      columnsConfig: administrativeAreaLevel2ColumnsConfig(),
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
        {
          association: 'administrativeAreaLevel1',
        },
      ],
    },
  });
};

export const administrativeAreaLevel2NewResolver: ResolveFn<Action> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const actionService = inject(ActionService);

  return actionService.action({
    id: 'common::administrativeAreaLevel2.detail.new',
    isViewAction: true,
  });
};

export const administrativeAreaLevel2EditResolver: ResolveFn<{
  object: CommonAdministrativeAreaLevel2;
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const actionService = inject(ActionService);
  const administrativeAreaLevel2Service = inject(
    AdministrativeAreaLevel2Service,
  );

  actionService.action({
    id: 'common::administrativeAreaLevel2.detail.edit',
    isViewAction: true,
  });

  return administrativeAreaLevel2Service.findById({
    id: route.paramMap.get('id'),
  });
};
