import { IamAddTenantsContextEvent, IamITenantRepository } from '@app/iam/tenant';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteTenantsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITenantRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const tenants = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (tenants.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddTenantsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const tenantsRegistered = this.publisher.mergeObjectContext(
            new IamAddTenantsContextEvent(
                tenants,
                cQMetadata,
            ),
        );

        tenantsRegistered.deleted(); // apply event to model events
        tenantsRegistered.commit(); // commit all events of model
    }
}
