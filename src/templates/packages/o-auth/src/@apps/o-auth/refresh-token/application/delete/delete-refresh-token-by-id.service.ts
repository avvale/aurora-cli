import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { RefreshTokenId } from '../../domain/value-objects';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';

@Injectable()
export class DeleteRefreshTokenByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository,
    ) {}

    async main(
        id: RefreshTokenId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const refreshToken = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(
            refreshToken.id,
            {
                deleteOptions: cQMetadata?.repositoryOptions,
                cQMetadata,
            },
        );

        // insert EventBus in object, to be able to apply and commit events
        const refreshTokenRegister = this.publisher.mergeObjectContext(refreshToken);

        refreshTokenRegister.deleted(refreshToken); // apply event to model events
        refreshTokenRegister.commit(); // commit all events of model
    }
}