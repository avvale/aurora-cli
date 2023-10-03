import { CommonResource } from '../common.types';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { attachmentFamilyColumnsConfig, AttachmentFamilyService } from '@apps/common/attachment-family';
import { CommonAttachmentFamily } from '@apps/common/common.types';
import { ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const attachmentFamilyPaginationResolver: ResolveFn<GridData<CommonAttachmentFamily>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const attachmentFamilyService = inject(AttachmentFamilyService);

    actionService.action({
        id          : 'common::attachmentFamily.list.view',
        isViewAction: true,
    });

    const gridId = 'common::attachmentFamily.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'common::attachmentFamily.list.pagination');
    gridStateService.setExportActionId(gridId, 'common::attachmentFamily.list.export');

    return attachmentFamilyService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: attachmentFamilyColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const attachmentFamilyNewResolver: ResolveFn<{
    commonGetResources: CommonResource[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const attachmentFamilyService = inject(AttachmentFamilyService);

    actionService.action({
        id          : 'common::attachmentFamily.detail.new',
        isViewAction: true,
    });

    return attachmentFamilyService.getRelations();
};

export const attachmentFamilyEditResolver: ResolveFn<{
    object: CommonAttachmentFamily;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const attachmentFamilyService = inject(AttachmentFamilyService);

    actionService.action({
        id          : 'common::attachmentFamily.detail.edit',
        isViewAction: true,
    });

    return attachmentFamilyService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
            constraint: {
                include: [
                    {
                        association: 'resources',
                    },
                ],
            },
        });
};
