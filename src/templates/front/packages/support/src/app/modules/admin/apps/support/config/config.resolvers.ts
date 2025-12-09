import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import {
    CLICKUP_TASK_PLATFORM_API_KEY,
    CLICKUP_TASK_PLATFORM_FOLDER_ID,
    CLICKUP_TASK_PLATFORM_LIST_ID,
    CLICKUP_TASK_PLATFORM_SPACE_ID,
    CLICKUP_TASK_PLATFORM_TEAM_ID,
    CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
    ClickupService,
    ClickupSpace,
} from '@apps/support/click-up';
import { ToolsKeyValue } from '@apps/tools';
import { KeyValueService } from '@apps/tools/key-value';
import { ActionService } from '@aurora';
import { forkJoin, Subject } from 'rxjs';

export const configEditResolver: ResolveFn<{
    keyValues: ToolsKeyValue[];
    spaces: ClickupSpace[];
    folders: ClickupSpace[];
    lists: ClickupSpace[];
}> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const actionService = inject(ActionService);
    const keyValueService = inject(KeyValueService);
    const clickupService = inject(ClickupService);

    actionService.action({
        id: 'support::config.detail.edit',
        isViewAction: true,
    });

    const configResponse = new Subject<{
        keyValues: ToolsKeyValue[];
        spaces: ClickupSpace[];
        folders: ClickupSpace[];
        lists: ClickupSpace[];
    }>();

    keyValueService
        .get({
            query: {
                where: {
                    key: [
                        CLICKUP_TASK_PLATFORM_API_KEY,
                        CLICKUP_TASK_PLATFORM_TEAM_ID,
                        CLICKUP_TASK_PLATFORM_SPACE_ID,
                        CLICKUP_TASK_PLATFORM_FOLDER_ID,
                        CLICKUP_TASK_PLATFORM_LIST_ID,
                        CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
                    ],
                },
            },
        })
        .subscribe((data) => {
            const clickupTaskPlatformApiKey = data.objects.find(
                (keyValue) => keyValue.key === CLICKUP_TASK_PLATFORM_API_KEY,
            );
            const clickupTaskPlatformTeamId = data.objects.find(
                (keyValue) => keyValue.key === CLICKUP_TASK_PLATFORM_TEAM_ID,
            );
            const clickupTaskPlatformSpaceId = data.objects.find(
                (keyValue) => keyValue.key === CLICKUP_TASK_PLATFORM_SPACE_ID,
            );
            const clickupTaskPlatformFolderId = data.objects.find(
                (keyValue) => keyValue.key === CLICKUP_TASK_PLATFORM_FOLDER_ID,
            );

            const observables$ = {};
            if (
                clickupTaskPlatformApiKey.value &&
                clickupTaskPlatformTeamId.value
            ) {
                observables$['spaces'] = clickupService.getSpaces({
                    teamId: clickupTaskPlatformTeamId.value,
                });

                if (clickupTaskPlatformSpaceId.value) {
                    observables$['folders'] = clickupService.getFolders({
                        spaceId: clickupTaskPlatformSpaceId.value,
                    });

                    if (clickupTaskPlatformFolderId.value) {
                        observables$['lists'] = clickupService.getLists({
                            folderId: clickupTaskPlatformFolderId.value,
                        });
                    }
                }
            }

            forkJoin(observables$).subscribe((clickupData: any) => {
                configResponse.next({
                    keyValues: data.objects,
                    ...clickupData,
                });
            });
        });

    return configResponse;
};
