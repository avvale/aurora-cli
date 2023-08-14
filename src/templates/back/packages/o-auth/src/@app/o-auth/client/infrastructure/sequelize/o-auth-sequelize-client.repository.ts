import { OAuthClient, OAuthClientMapper, OAuthClientModel, OAuthIClientRepository } from '@app/o-auth/client';
import { AuditingRunner, ICriteria, LiteralObject, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OAuthSequelizeClientRepository extends SequelizeRepository<OAuthClient, OAuthClientModel> implements OAuthIClientRepository
{
    public readonly aggregateName: string = 'OAuthClient';
    public readonly mapper: OAuthClientMapper = new OAuthClientMapper();

    constructor(
        @InjectModel(OAuthClientModel)
        public readonly repository: typeof OAuthClientModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(
        aggregate: OAuthClient,
        model: OAuthClientModel,
        createOptions: LiteralObject,
    ): Promise<void>
    {
        // add many to many relation
        if (aggregate.applicationIds.length > 0)
        {
            await model.$add(
                'applications',
                aggregate.applicationIds.value,
                createOptions,
            );
        }
    }

    // hook called after create aggregate
    async updatedByIdAggregateHook(
        aggregate: OAuthClient,
        model: OAuthClientModel,
        updateByIdOptions: LiteralObject,
    ): Promise<void>
    {
        // set many to many relation
        if (aggregate.applicationIds.isArray())
        {
            await model.$set(
                'applications',
                aggregate.applicationIds.value,
                updateByIdOptions,
            );
        }
    }
}
