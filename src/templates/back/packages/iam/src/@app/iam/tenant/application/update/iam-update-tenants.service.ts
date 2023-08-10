import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    IamTenantId,
    IamTenantName,
    IamTenantCode,
    IamTenantLogo,
    IamTenantIsActive,
    IamTenantMeta,
    IamTenantAccountIds,
    IamTenantCreatedAt,
    IamTenantUpdatedAt,
    IamTenantDeletedAt,
} from '../../domain/value-objects';
import { IamITenantRepository } from '../../domain/iam-tenant.repository';
import { IamTenant } from '../../domain/iam-tenant.aggregate';
import { IamAddTenantsContextEvent } from '../events/iam-add-tenants-context.event';

@Injectable()
export class IamUpdateTenantsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITenantRepository,
    ) {}

    async main(
        payload: {
            id?: IamTenantId;
            name?: IamTenantName;
            code?: IamTenantCode;
            logo?: IamTenantLogo;
            isActive?: IamTenantIsActive;
            meta?: IamTenantMeta;
            accountIds?: IamTenantAccountIds;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const tenant = IamTenant.register(
            payload.id,
            payload.name,
            payload.code,
            payload.logo,
            payload.isActive,
            payload.meta,
            payload.accountIds,
            null, // createdAt
            new IamTenantUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            tenant,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const tenants = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tenantsRegister = this.publisher.mergeObjectContext(
            new IamAddTenantsContextEvent(tenants),
        );

        tenantsRegister.updated(); // apply event to model events
        tenantsRegister.commit(); // commit all events of model
    }
}
