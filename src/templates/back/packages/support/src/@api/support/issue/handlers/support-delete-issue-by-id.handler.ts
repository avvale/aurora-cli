import { SupportIssue } from '@api/graphql';
import { StorageAccountFileManagerService } from '@api/storage-account/file-manager';
import {
    CLICKUP_TASK_PLATFORM_API_KEY,
    ClickupService,
} from '@api/support/clickup/shared';
import { SupportIssueDto } from '@api/support/issue';
import {
    SupportDeleteIssueByIdCommand,
    SupportFindIssueByIdQuery,
} from '@app/support/issue';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SupportDeleteIssueByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly storageAccountFileManagerService: StorageAccountFileManagerService,
        private readonly clickupService: ClickupService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<SupportIssue | SupportIssueDto> {
        const issue = await this.queryBus.ask(
            new SupportFindIssueByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!issue)
            throw new NotFoundException(
                `SupportIssue with id: ${id}, not found`,
            );

        await this.commandBus.dispatch(
            new SupportDeleteIssueByIdCommand(id, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        if (issue.screenRecording) {
            void this.storageAccountFileManagerService.deleteFile(
                issue.screenRecording,
            );
        }

        const clickupTaskPlatformApiKey = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_API_KEY,
        );

        void lastValueFrom(
            this.clickupService.deleteTask(issue.externalId, {
                authorization: clickupTaskPlatformApiKey,
            }),
        );

        return issue;
    }
}
