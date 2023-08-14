import { OAuthAddScopesContextEvent, OAuthIScopeRepository } from '@app/o-auth/scope';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthDeleteScopesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIScopeRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const scopes = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (scopes.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddScopesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const scopesRegistered = this.publisher.mergeObjectContext(
            new OAuthAddScopesContextEvent(scopes),
        );

        scopesRegistered.deleted(); // apply event to model events
        scopesRegistered.commit(); // commit all events of model
    }
}
