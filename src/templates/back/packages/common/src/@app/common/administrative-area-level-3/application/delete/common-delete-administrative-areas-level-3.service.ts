import { CommonAddAdministrativeAreasLevel3ContextEvent, CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAdministrativeAreasLevel3Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAdministrativeAreaLevel3Repository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const administrativeAreasLevel3 = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (administrativeAreasLevel3.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddAdministrativeAreasLevel3ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreasLevel3Registered = this.publisher.mergeObjectContext(
            new CommonAddAdministrativeAreasLevel3ContextEvent(administrativeAreasLevel3),
        );

        administrativeAreasLevel3Registered.deleted(); // apply event to model events
        administrativeAreasLevel3Registered.commit(); // commit all events of model
    }
}