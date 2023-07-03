import { CommonIAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1Id } from '@app/common/administrative-area-level-1/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAdministrativeAreaLevel1ByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAdministrativeAreaLevel1Repository,
    ) {}

    async main(
        id: CommonAdministrativeAreaLevel1Id,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const administrativeAreaLevel1 = await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(
            administrativeAreaLevel1.id,
            {
                deleteOptions: cQMetadata?.repositoryOptions,
                cQMetadata,
            },
        );

        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreaLevel1Register = this.publisher.mergeObjectContext(administrativeAreaLevel1);

        administrativeAreaLevel1Register.deleted(administrativeAreaLevel1); // apply event to model events
        administrativeAreaLevel1Register.commit(); // commit all events of model
    }
}