import { SupportComment, SupportUpdateCommentByIdInput } from '@api/graphql';
import {
    CLICKUP_TASK_PLATFORM_API_KEY,
    ClickupService,
} from '@api/support/clickup/shared';
import {
    SupportCommentDto,
    SupportUpdateCommentByIdDto,
} from '@api/support/comment';
import {
    SupportFindCommentByIdQuery,
    SupportUpdateCommentByIdCommand,
} from '@app/support/comment';
import {
    AuditingMeta,
    diff,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SupportUpdateCommentByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly clickupService: ClickupService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        payload: SupportUpdateCommentByIdInput | SupportUpdateCommentByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<SupportComment | SupportCommentDto> {
        const comment = await this.queryBus.ask(
            new SupportFindCommentByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );

        const dataToUpdate = diff(payload, comment);

        await this.commandBus.dispatch(
            new SupportUpdateCommentByIdCommand(
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

            void lastValueFrom(
                this.clickupService.updateComment(
                    comment.externalId,
                    {
                        comment: payload.description,
                        resolved: false,
                    },
                    { authorization: clickupTaskPlatformApiKey },
                ),
            );
        } catch (error) {
            console.error('Error creating ClickUp task:', error);
        }

        return await this.queryBus.ask(
            new SupportFindCommentByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );
    }
}
