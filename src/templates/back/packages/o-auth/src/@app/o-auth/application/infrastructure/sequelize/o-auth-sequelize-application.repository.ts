import { OAuthApplication, OAuthApplicationMapper, OAuthApplicationModel, OAuthIApplicationRepository } from '@app/o-auth/application';
import { AuditingRunner, ICriteria, LiteralObject, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OAuthSequelizeApplicationRepository extends SequelizeRepository<OAuthApplication, OAuthApplicationModel> implements OAuthIApplicationRepository
{
    public readonly aggregateName: string = 'OAuthApplication';
    public readonly mapper: OAuthApplicationMapper = new OAuthApplicationMapper();

    constructor(
        @InjectModel(OAuthApplicationModel)
        public readonly repository: typeof OAuthApplicationModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(
        aggregate: OAuthApplication,
        model: OAuthApplicationModel,
        createOptions: LiteralObject,
    ): Promise<void>
    {
        // add many to many relation
        if (aggregate.clientIds.length > 0)
        {
            await model.$add(
                'clients',
                aggregate.clientIds.value,
                createOptions,
            );
        }
    }

    // hook called after create aggregate
    async updatedByIdAggregateHook(
        aggregate: OAuthApplication,
        model: OAuthApplicationModel,
        updateByIdOptions: LiteralObject,
    ): Promise<void>
    {
        // set many to many relation
        if (aggregate.clientIds.isArray())
        {
            await model.$set(
                'clients',
                aggregate.clientIds.value,
                updateByIdOptions,
            );
        }
    }
}
