import { SupportComment, SupportCreateCommentInput } from '@api/graphql';
import {
    CLICKUP_TASK_PLATFORM_API_KEY,
    ClickupService,
} from '@api/support/clickup/shared';
import { IamAccountResponse } from '@app/iam/account/domain/iam-account.response';
import {
    SupportCreateCommentCommand,
    SupportFindCommentByIdQuery,
    SupportUpdateCommentByIdCommand,
} from '@app/support/comment';
import { SupportFindIssueByIdQuery } from '@app/support/issue';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SupportCreateCommentHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly clickupService: ClickupService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: SupportCreateCommentInput,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<SupportComment> {
        const displayName =
            account.user.name +
            (account.user.surname ? ' ' + account.user.surname : '');

        await this.commandBus.dispatch(
            new SupportCreateCommentCommand(
                {
                    ...payload,
                    accountId: account.id,
                    accountUsername: account.username,
                    displayName,
                },
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        const issue = await this.queryBus.ask(
            new SupportFindIssueByIdQuery(payload.issueId),
        );

        const clickupTaskPlatformApiKey = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_API_KEY,
        );

        const comment = await lastValueFrom(
            this.clickupService.createTaskComment(
                issue.externalId,
                {
                    comment: displayName + ', dice:\n' + payload.description,
                    notifyAll: true,
                },
                { authorization: clickupTaskPlatformApiKey },
            ),
        );

        void this.commandBus.dispatch(
            new SupportUpdateCommentByIdCommand({
                id: payload.id,
                externalId: comment.id,
            }),
        );

        return await this.queryBus.ask(
            new SupportFindCommentByIdQuery(
                payload.id,
                {},
                {
                    timezone,
                },
            ),
        );
    }
}
