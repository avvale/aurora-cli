import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { AddAccessTokensContextEvent } from '../events/add-access-tokens-context.event';

@Injectable()
export class DeleteAccessTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccessTokenRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const accessTokens = await this.repository.get({ queryStatement, constraint, cQMetadata });

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddAccessTokensContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const accessTokensRegistered = this.publisher.mergeObjectContext(
            new AddAccessTokensContextEvent(accessTokens),
        );

        accessTokensRegistered.deleted(); // apply event to model events
        accessTokensRegistered.commit(); // commit all events of model
    }
}