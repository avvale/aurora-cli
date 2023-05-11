import { Injectable, LiteralObject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { IApplicationRepository } from '../../domain/application.repository';
import { OAuthApplication } from '../../domain/application.aggregate';
import { ApplicationMapper } from '../../domain/application.mapper';
import { OAuthApplicationModel } from './sequelize-application.model';

@Injectable()
export class SequelizeApplicationRepository extends SequelizeRepository<OAuthApplication, OAuthApplicationModel> implements IApplicationRepository
{
    public readonly aggregateName: string = 'OAuthApplication';
    public readonly mapper: ApplicationMapper = new ApplicationMapper();

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