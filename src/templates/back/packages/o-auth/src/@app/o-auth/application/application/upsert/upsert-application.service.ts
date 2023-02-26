import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
import {
    ApplicationId,
    ApplicationCode,
    ApplicationName,
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
export class UpsertApplicationService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IApplicationRepository,
    ) {}

    async main(
        payload: {
            id: ApplicationId;
            code: ApplicationCode;
            name: ApplicationName;
            secret: ApplicationSecret;
            isMaster: ApplicationIsMaster;
            clientIds: ApplicationClientIds;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const application = OAuthApplication.register(
            payload.id,
            payload.code,
            payload.name,
            payload.secret,
            payload.isMaster,
            payload.clientIds,
            new ApplicationCreatedAt({ currentTimestamp: true }),
            new ApplicationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(application, {
                upsertOptions: cQMetadata?.repositoryOptions,
            });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationRegister = this.publisher.mergeObjectContext(
            application,
        );

        applicationRegister.created(application); // apply event to model events
        applicationRegister.commit(); // commit all events of model
    }
}