import { IamITenantRepository, IamTenant } from '@app/iam/tenant';
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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateTenantByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITenantRepository,
    ) {}

    async main(
        payload: {
            id: IamTenantId;
            name?: IamTenantName;
            code?: IamTenantCode;
            logo?: IamTenantLogo;
            isActive?: IamTenantIsActive;
            meta?: IamTenantMeta;
            accountIds?: IamTenantAccountIds;
        },
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

        // update by id
        await this.repository.updateById(
            tenant,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tenantRegister = this.publisher.mergeObjectContext(
            tenant,
        );

        tenantRegister.updated(tenant); // apply event to model events
        tenantRegister.commit(); // commit all events of model
    }
}
