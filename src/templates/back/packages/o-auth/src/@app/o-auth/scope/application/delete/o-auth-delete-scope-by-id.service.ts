import { OAuthIScopeRepository } from '@app/o-auth/scope';
import { OAuthScopeId } from '@app/o-auth/scope/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthDeleteScopeByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIScopeRepository,
    ) {}

    async main(
        id: OAuthScopeId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get object to delete
        const scope = await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(scope.id, {
            deleteOptions: cQMetadata?.repositoryOptions,
            cQMetadata,
        });

        // insert EventBus in object, to be able to apply and commit events
        const scopeRegister = this.publisher.mergeObjectContext(scope);

        scopeRegister.deleted({
            payload: scope,
            cQMetadata,
        }); // apply event to model events
        scopeRegister.commit(); // commit all events of model
    }
}
