import {
    OAuthAddAccessTokensContextEvent,
    OAuthIAccessTokenRepository,
} from '@app/o-auth/access-token';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthDeleteAccessTokensService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIAccessTokenRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get objects to delete
        const accessTokens = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (accessTokens.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddAccessTokensContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const accessTokensRegistered = this.publisher.mergeObjectContext(
            new OAuthAddAccessTokensContextEvent(accessTokens, cQMetadata),
        );

        accessTokensRegistered.deleted(); // apply event to model events
        accessTokensRegistered.commit(); // commit all events of model
    }
}
