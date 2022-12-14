import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import { AccessTokenId } from '../../domain/value-objects';
import { IAccessTokenRepository } from '../../domain/access-token.repository';

@Injectable()
export class DeleteAccessTokenByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccessTokenRepository,
    ) {}

    async main(
        id: AccessTokenId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const accessToken = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(
            accessToken.id,
            {
                deleteOptions: cQMetadata?.repositoryOptions,
                cQMetadata,
            },
        );

        // insert EventBus in object, to be able to apply and commit events
        const accessTokenRegister = this.publisher.mergeObjectContext(accessToken);

        accessTokenRegister.deleted(accessToken); // apply event to model events
        accessTokenRegister.commit(); // commit all events of model
    }
}