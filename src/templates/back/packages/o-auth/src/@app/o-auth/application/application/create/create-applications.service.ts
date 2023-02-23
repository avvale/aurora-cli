import { Injectable } from '@nestjs/common';
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
import { AddApplicationsContextEvent } from '../events/add-applications-context.event';

@Injectable()
export class CreateApplicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IApplicationRepository,
    ) {}

    async main(
        applications: {
            id: ApplicationId;
            code: ApplicationCode;
            name: ApplicationName;
            secret: ApplicationSecret;
            isMaster: ApplicationIsMaster;
            clientIds: ApplicationClientIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplications = applications.map(application => OAuthApplication.register(
            application.id,
            application.code,
            application.name,
            application.secret,
            application.isMaster,
            application.clientIds,
            new ApplicationCreatedAt({ currentTimestamp: true }),
            new ApplicationUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateApplications, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddApplicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationsRegistered = this.publisher.mergeObjectContext(new AddApplicationsContextEvent(aggregateApplications));

        applicationsRegistered.created(); // apply event to model events
        applicationsRegistered.commit(); // commit all events of model
    }
}