import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, LiteralObject, SequelizeRepository } from '@aurorajs.dev/core';
import { ITenantRepository } from '../../domain/tenant.repository';
import { IamTenant } from '../../domain/tenant.aggregate';
import { TenantMapper } from '../../domain/tenant.mapper';
import { IamTenantModel } from './sequelize-tenant.model';

@Injectable()
export class SequelizeTenantRepository extends SequelizeRepository<IamTenant, IamTenantModel> implements ITenantRepository
{
    public readonly aggregateName: string = 'IamTenant';
    public readonly mapper: TenantMapper = new TenantMapper();

    constructor(
        @InjectModel(IamTenantModel)
        public readonly repository: typeof IamTenantModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(
        aggregate: IamTenant,
        model: IamTenantModel,
        createOptions: LiteralObject,
    ): Promise<void>
    {
        // add many to many relation
        if (aggregate.accountIds.length > 0)
        {
            await model.$add(
                'accounts',
                aggregate.accountIds.value,
                createOptions,
            );
        }
    }

    // hook called after create aggregate
    async updatedByIdAggregateHook(
        aggregate: IamTenant,
        model: IamTenantModel,
        updateByIdOptions: LiteralObject,
    ): Promise<void>
    {
        // set many to many relation
        if (aggregate.accountIds.isArray())
        {
            await model.$set(
                'accounts',
                aggregate.accountIds.value,
                updateByIdOptions,
            );
        }
    }
}