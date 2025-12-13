import { SupportCreateIssueInput, SupportIssue } from '@api/graphql';
import { StorageAccountFileManagerService } from '@api/storage-account/file-manager';
import {
    CLICKUP_TASK_PLATFORM_API_KEY,
    CLICKUP_TASK_PLATFORM_LIST_ID,
    ClickupService,
} from '@api/support/clickup/shared';
import { IamAccountResponse } from '@app/iam/account/domain/iam-account.response';
import {
    SupportCreateIssueCommand,
    SupportFindIssueByIdQuery,
    SupportUpdateIssueByIdCommand,
} from '@app/support/issue';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SupportCreateIssueHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly storageAccountFileManagerService: StorageAccountFileManagerService,
        private readonly clickupService: ClickupService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: SupportCreateIssueInput,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<SupportIssue> {
        await this.commandBus.dispatch(
            new SupportCreateIssueCommand(
                {
                    ...payload,
                    accountUsername: account.username,
                    displayName:
                        account.user.name +
                        (account.user.surname
                            ? ' ' + account.user.surname
                            : ''),
                },
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        const screenRecordingUploaded = payload.screenRecording
            ? await this.storageAccountFileManagerService.uploadFile(
                  payload.screenRecording,
              )
            : null;

        const clickupTaskPlatformApiKey = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_API_KEY,
        );

        const clickupTaskPlatformListId = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_LIST_ID,
        );

        const task = await lastValueFrom(
            this.clickupService.createTask(
                clickupTaskPlatformListId,
                {
                    name: payload.subject,
                    description: payload.description,
                },
                { authorization: clickupTaskPlatformApiKey },
            ),
        );

        if (screenRecordingUploaded) {
            await lastValueFrom(
                this.clickupService.createAttachment(
                    task.id,
                    {
                        ...payload.screenRecording,
                        file: {
                            stream: await this.storageAccountFileManagerService.getStreamFile(
                                screenRecordingUploaded,
                            ),
                            filename: payload.screenRecording.file.filename,
                            mimetype: payload.screenRecording.file.mimetype,
                        },
                    },
                    { authorization: clickupTaskPlatformApiKey },
                ),
            );
        }

        void this.commandBus.dispatch(
            new SupportUpdateIssueByIdCommand({
                id: payload.id,
                screenRecording: screenRecordingUploaded,
                externalId: task.id,
                externalStatus: task.status.status,
                externalColorStatus: task.status.color,
            }),
        );

        return await this.queryBus.ask(
            new SupportFindIssueByIdQuery(
                payload.id,
                {},
                {
                    timezone,
                },
            ),
        );
    }
}
