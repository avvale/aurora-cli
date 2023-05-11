import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AdministrativeAreaLevel2Id } from '../../domain/value-objects';
import { IAdministrativeAreaLevel2Repository } from '../../domain/administrative-area-level-2.repository';

@Injectable()
export class DeleteAdministrativeAreaLevel2ByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel2Repository,
    ) {}

    async main(
        id: AdministrativeAreaLevel2Id,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const administrativeAreaLevel2 = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(
            administrativeAreaLevel2.id,
            {
                deleteOptions: cQMetadata?.repositoryOptions,
                cQMetadata,
            },
        );

        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreaLevel2Register = this.publisher.mergeObjectContext(administrativeAreaLevel2);

        administrativeAreaLevel2Register.deleted(administrativeAreaLevel2); // apply event to model events
        administrativeAreaLevel2Register.commit(); // commit all events of model
    }
}