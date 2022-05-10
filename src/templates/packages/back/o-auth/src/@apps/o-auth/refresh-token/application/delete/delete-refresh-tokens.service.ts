import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { AddRefreshTokensContextEvent } from '../events/add-refresh-tokens-context.event';

@Injectable()
export class DeleteRefreshTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const refreshTokens = await this.repository.get({ queryStatement, constraint, cQMetadata });

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddRefreshTokensContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const refreshTokensRegistered = this.publisher.mergeObjectContext(
            new AddRefreshTokensContextEvent(refreshTokens),
        );

        refreshTokensRegistered.deleted(); // apply event to model events
        refreshTokensRegistered.commit(); // commit all events of model
    }
}