import { IamAddTenantsContextEvent, IamITenantRepository, IamTenant } from '@app/iam/tenant';
import {
    IamTenantAccountIds,
    IamTenantCode,
    IamTenantCreatedAt,
    IamTenantDeletedAt,
    IamTenantId,
    IamTenantIsActive,
    IamTenantLogo,
    IamTenantMeta,
    IamTenantName,
    IamTenantUpdatedAt,
} from '@app/iam/tenant/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateTenantsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITenantRepository,
    ) {}

    async main(
        payload: {
            id: IamTenantId;
            name: IamTenantName;
            code: IamTenantCode;
            logo: IamTenantLogo;
            isActive: IamTenantIsActive;
            meta: IamTenantMeta;
            accountIds: IamTenantAccountIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateTenants = payload.map(tenant => IamTenant.register(
            tenant.id,
            tenant.name,
            tenant.code,
            tenant.logo,
            tenant.isActive,
            tenant.meta,
            tenant.accountIds,
            new IamTenantCreatedAt({ currentTimestamp: true }),
            new IamTenantUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateTenants,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddTenantsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const tenantsRegistered = this.publisher.mergeObjectContext(new IamAddTenantsContextEvent(aggregateTenants));

        tenantsRegistered.created(); // apply event to model events
        tenantsRegistered.commit(); // commit all events of model
    }
}
