import { CommonAddAdministrativeAreasLevel1ContextEvent, CommonIAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAdministrativeAreasLevel1Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAdministrativeAreaLevel1Repository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const administrativeAreasLevel1 = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (administrativeAreasLevel1.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddAdministrativeAreasLevel1ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreasLevel1Registered = this.publisher.mergeObjectContext(
            new CommonAddAdministrativeAreasLevel1ContextEvent(administrativeAreasLevel1),
        );

        administrativeAreasLevel1Registered.deleted(); // apply event to model events
        administrativeAreasLevel1Registered.commit(); // commit all events of model
    }
}