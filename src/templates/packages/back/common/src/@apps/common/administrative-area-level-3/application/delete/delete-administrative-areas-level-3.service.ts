import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IAdministrativeAreaLevel3Repository } from './../../domain/administrative-area-level-3.repository';
import { AddAdministrativeAreasLevel3ContextEvent } from './../events/add-administrative-areas-level-3-context.event';

@Injectable()
export class DeleteAdministrativeAreasLevel3Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel3Repository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const administrativeAreasLevel3 = await this.repository.get({ queryStatement, constraint, cQMetadata });

        await this.repository.delete({ queryStatement, constraint, cQMetadata });

        // create AddAdministrativeAreasLevel3ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreasLevel3Registered = this.publisher.mergeObjectContext(new AddAdministrativeAreasLevel3ContextEvent(administrativeAreasLevel3));

        administrativeAreasLevel3Registered.deleted(); // apply event to model events
        administrativeAreasLevel3Registered.commit(); // commit all events of model
    }
}