import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AdministrativeAreaLevel3Id } from '../../domain/value-objects';
import { IAdministrativeAreaLevel3Repository } from '../../domain/administrative-area-level-3.repository';

@Injectable()
export class DeleteAdministrativeAreaLevel3ByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel3Repository,
    ) {}

    async main(
        id: AdministrativeAreaLevel3Id,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const administrativeAreaLevel3 = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(
            administrativeAreaLevel3.id,
            {
                deleteOptions: cQMetadata?.repositoryOptions,
                cQMetadata,
            },
        );

        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreaLevel3Register = this.publisher.mergeObjectContext(administrativeAreaLevel3);

        administrativeAreaLevel3Register.deleted(administrativeAreaLevel3); // apply event to model events
        administrativeAreaLevel3Register.commit(); // commit all events of model
    }
}