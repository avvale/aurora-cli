import { SupportComment } from '@api/graphql';
import {
    CLICKUP_TASK_PLATFORM_API_KEY,
    ClickupService,
} from '@api/support/clickup/shared';
import {
    SupportDeleteCommentByIdCommand,
    SupportFindCommentByIdQuery,
} from '@app/support/comment';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SupportDeleteCommentByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly clickupService: ClickupService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<SupportComment> {
        const comment = await this.queryBus.ask(
            new SupportFindCommentByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!comment) {
            throw new NotFoundException(
                `SupportComment with id: ${id}, not found`,
            );
        }

        await this.commandBus.dispatch(
            new SupportDeleteCommentByIdCommand(id, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        try {
            if (!comment.externalId)
                throw new BadRequestException(
                    'Comment does not have an externalId',
                );

            const clickupTaskPlatformApiKey =
                await this.cacheManager.get<string>(
                    CLICKUP_TASK_PLATFORM_API_KEY,
                );

            void lastValueFrom(
                this.clickupService.deleteComment(comment.externalId, {
                    authorization: clickupTaskPlatformApiKey,
                }),
            );
        } catch (error) {
            if (error.status !== 400)
                console.error('Error deleting ClickUp comment:', error);

            Logger.error(
                'Error deleting ClickUp comment: ' + error,
                'SupportDeleteCommentByIdHandler',
            );
        }

        return comment;
    }
}
