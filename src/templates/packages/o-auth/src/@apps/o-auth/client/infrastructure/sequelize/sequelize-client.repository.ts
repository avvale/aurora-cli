import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from 'aurora-ts-core';
import { IClientRepository } from '../../domain/client.repository';
import { OAuthClient } from '../../domain/client.aggregate';
import { ClientMapper } from '../../domain/client.mapper';
import { OAuthClientModel } from './sequelize-client.model';

@Injectable()
export class SequelizeClientRepository extends SequelizeRepository<OAuthClient, OAuthClientModel> implements IClientRepository
{
    public readonly aggregateName: string = 'OAuthClient';
    public readonly mapper: ClientMapper = new ClientMapper();

    constructor(
        @InjectModel(OAuthClientModel)
        public readonly repository: typeof OAuthClientModel,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(aggregate: OAuthClient, model: OAuthClientModel): Promise<void>
    {
        // add many to many relation
        if (aggregate.applicationIds.length > 0) await model.$add('applications', aggregate.applicationIds.value);
    }

    // hook called after create aggregate
    async updatedAggregateHook(aggregate: OAuthClient, model: OAuthClientModel): Promise<void>
    {
        // set many to many relation
        if (aggregate.applicationIds.isArray()) await model.$set('applications', aggregate.applicationIds.value);
    }
}