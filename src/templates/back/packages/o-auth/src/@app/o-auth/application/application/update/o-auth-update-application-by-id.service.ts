import {
    OAuthApplication,
    OAuthIApplicationRepository,
} from '@app/o-auth/application';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationUpdatedAt,
} from '@app/o-auth/application/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthUpdateApplicationByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIApplicationRepository,
    ) {}

    async main(
        payload: {
            id: OAuthApplicationId;
            code?: OAuthApplicationCode;
            name?: OAuthApplicationName;
            secret?: OAuthApplicationSecret;
            isMaster?: OAuthApplicationIsMaster;
            clientIds?: OAuthApplicationClientIds;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const application = OAuthApplication.register(
            payload.id,
            undefined, // rowId
            payload.code,
            payload.name,
            payload.secret,
            payload.isMaster,
            payload.clientIds,
            null, // createdAt
            new OAuthApplicationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(application, {
            constraint,
            cQMetadata,
            updateByIdOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationRegister =
            this.publisher.mergeObjectContext(application);

        applicationRegister.updated({
            payload: application,
            cQMetadata,
        }); // apply event to model events
        applicationRegister.commit(); // commit all events of model
    }
}
