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
    IamTenantParentId,
    IamTenantUpdatedAt,
} from '@app/iam/tenant/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

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
            parentId?: IamTenantParentId;
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
            payload.parentId,
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
            new IamAddTenantsContextEvent(
                tenants,
                cQMetadata,
            ),
        );

        tenantsRegister.updated(); // apply event to model events
        tenantsRegister.commit(); // commit all events of model
    }
}
