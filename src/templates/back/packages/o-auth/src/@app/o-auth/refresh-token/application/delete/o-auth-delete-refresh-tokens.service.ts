import { OAuthAddRefreshTokensContextEvent, OAuthIRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthDeleteRefreshTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIRefreshTokenRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const refreshTokens = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (refreshTokens.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddRefreshTokensContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const refreshTokensRegistered = this.publisher.mergeObjectContext(
            new OAuthAddRefreshTokensContextEvent(refreshTokens),
        );

        refreshTokensRegistered.deleted(); // apply event to model events
        refreshTokensRegistered.commit(); // commit all events of model
    }
}
