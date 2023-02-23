import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantMeta,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from '../../domain/value-objects';
import { ITenantRepository } from '../../domain/tenant.repository';
import { IamTenant } from '../../domain/tenant.aggregate';

@Injectable()
export class UpdateTenantByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository,
    ) {}

    async main(
        payload: {
            id: TenantId;
            name?: TenantName;
            code?: TenantCode;
            logo?: TenantLogo;
            isActive?: TenantIsActive;
            meta?: TenantMeta;
            accountIds?: TenantAccountIds;
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
            new TenantUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update by id
        await this.repository.updateById(tenant, { constraint, cQMetadata, updateByIdOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tenantRegister = this.publisher.mergeObjectContext(
            tenant,
        );

        tenantRegister.updated(tenant); // apply event to model events
        tenantRegister.commit(); // commit all events of model
    }
}