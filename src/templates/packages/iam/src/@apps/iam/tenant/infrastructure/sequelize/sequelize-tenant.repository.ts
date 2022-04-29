import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from 'aurora-ts-core';
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
    )
    {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(aggregate: IamTenant, model: IamTenantModel): Promise<void>
    {
        // add many to many relation
        if (aggregate.accountIds.length > 0) await model.$add('accounts', aggregate.accountIds.value);
    }

    // hook called after create aggregate
    async updatedAggregateHook(aggregate: IamTenant, model: IamTenantModel): Promise<void>
    {
        // set many to many relation
        if (aggregate.accountIds.isArray()) await model.$set('accounts', aggregate.accountIds.value);
    }
}