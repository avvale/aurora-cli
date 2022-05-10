import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import {
    ApplicationId,
    ApplicationName,
    ApplicationCode,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from '../../domain/value-objects';
import { IApplicationRepository } from '../../domain/application.repository';
import { OAuthApplication } from '../../domain/application.aggregate';

@Injectable()
export class UpdateApplicationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IApplicationRepository,
    ) {}

    async main(
        payload: {
            id: ApplicationId;
            name?: ApplicationName;
            code?: ApplicationCode;
            secret?: ApplicationSecret;
            isMaster?: ApplicationIsMaster;
            clientIds?: ApplicationClientIds;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const application = OAuthApplication.register(
            payload.id,
            payload.name,
            payload.code,
            payload.secret,
            payload.isMaster,
            payload.clientIds,
            null, // createdAt
            new ApplicationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update by id
        await this.repository.updateById(application, { constraint, cQMetadata, updateByIdOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationRegister = this.publisher.mergeObjectContext(
            application,
        );

        applicationRegister.updated(application); // apply event to model events
        applicationRegister.commit(); // commit all events of model
    }
}