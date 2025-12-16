import { SupportIssue, SupportUpdateIssueByIdInput } from '@api/graphql';
import {
    CLICKUP_TASK_PLATFORM_API_KEY,
    ClickupService,
} from '@api/support/clickup/shared';
import { IamAccountResponse } from '@app/iam/account';
import {
    SupportFindIssueByIdQuery,
    SupportUpdateIssueByIdCommand,
} from '@app/support/issue';
import {
    AuditingMeta,
    diff,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SupportUpdateIssueByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly clickupService: ClickupService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: SupportUpdateIssueByIdInput,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<SupportIssue> {
        const issue = await this.queryBus.ask(
            new SupportFindIssueByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );

        if (!issue) {
            throw new NotFoundException(
                `SupportIssue with id: ${payload.id}, not found`,
            );
        }

        const dataToUpdate = diff(payload, issue);

        await this.commandBus.dispatch(
            new SupportUpdateIssueByIdCommand(
                {
                    ...dataToUpdate,
                    id: payload.id,
                },
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        try {
            const clickupTaskPlatformApiKey =
                await this.cacheManager.get<string>(
                    CLICKUP_TASK_PLATFORM_API_KEY,
                );

            const displayName =
                account.user.name +
                (account.user.surname ? ' ' + account.user.surname : '');

            void lastValueFrom(
                this.clickupService.updateTask(
                    issue.externalId,
                    {
                        name: payload.subject,
                        description:
                            displayName + ', dice:\n' + payload.description,
                    },
                    { authorization: clickupTaskPlatformApiKey },
                ),
            );
        } catch (error) {
            console.error('Error creating ClickUp task:', error);
        }

        return await this.queryBus.ask(
            new SupportFindIssueByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );
    }
}
