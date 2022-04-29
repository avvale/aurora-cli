import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IAdministrativeAreaLevel1Repository } from './../../domain/administrative-area-level-1.repository';
import { AddAdministrativeAreasLevel1ContextEvent } from './../events/add-administrative-areas-level-1-context.event';

@Injectable()
export class DeleteAdministrativeAreasLevel1Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel1Repository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const administrativeAreasLevel1 = await this.repository.get({ queryStatement, constraint, cQMetadata });

        await this.repository.delete({ queryStatement, constraint, cQMetadata });

        // create AddAdministrativeAreasLevel1ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreasLevel1Registered = this.publisher.mergeObjectContext(new AddAdministrativeAreasLevel1ContextEvent(administrativeAreasLevel1));

        administrativeAreasLevel1Registered.deleted(); // apply event to model events
        administrativeAreasLevel1Registered.commit(); // commit all events of model
    }
}