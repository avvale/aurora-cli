import { IamITenantRepository, IamTenant, IamTenantMapper, IamTenantModel } from '@app/iam/tenant';
import { AuditingRunner, ICriteria, LiteralObject, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizeTenantRepository extends SequelizeRepository<IamTenant, IamTenantModel> implements IamITenantRepository
{
    public readonly aggregateName: string = 'IamTenant';
    public readonly mapper: IamTenantMapper = new IamTenantMapper();

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
        if (aggregate?.accountIds.length > 0)
        {
            try
            {
                await model.$add(
                    'accounts',
                    aggregate.accountIds.value,
                    createOptions,
                );
            }
            catch (error)
            {
                console.error('[Error] SequelizeRepository:', error);
            }
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
        if (aggregate?.accountIds.isArray())
        {
            try
            {
                await model.$set(
                    'accounts',
                    aggregate.accountIds.value,
                    updateByIdOptions,
                );
            }
            catch (error)
            {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
    }
}
