import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
import { ITenantRepository } from '../../domain/tenant.repository';
import { IamTenant } from '../../domain/tenant.aggregate';
import {
    TenantAccountIds,
    TenantCode,
    TenantCreatedAt,
    TenantDeletedAt,
    TenantId,
    TenantIsActive,
    TenantLogo,
    TenantMeta,
    TenantName,
    TenantUpdatedAt,
} from '../../domain/value-objects';

@Injectable()
export class CreateTenantService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository,
    ) {}

    async main(
        payload: {
            id: TenantId;
            name: TenantName;
            code: TenantCode;
            logo: TenantLogo;
            isActive: TenantIsActive;
            meta: TenantMeta;
            accountIds: TenantAccountIds;
        },
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
            new TenantCreatedAt({ currentTimestamp: true }),
            new TenantUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(tenant, { createOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tenantRegister = this.publisher.mergeObjectContext(
            tenant,
        );

        tenantRegister.created(tenant); // apply event to model events
        tenantRegister.commit(); // commit all events of model
    }
}