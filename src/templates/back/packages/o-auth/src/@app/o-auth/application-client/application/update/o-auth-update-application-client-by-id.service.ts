import {
  OAuthApplicationClient,
  OAuthIApplicationClientRepository,
} from '@app/o-auth/application-client';
import {
  OAuthApplicationClientApplicationId,
  OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthUpdateApplicationClientByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: OAuthIApplicationClientRepository,
  ) {}

  async main(
    payload: {
      applicationId: OAuthApplicationClientApplicationId;
      clientId: OAuthApplicationClientClientId;
    },
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const applicationClient = OAuthApplicationClient.register(
      payload.applicationId,
      payload.clientId,
    );

    // update by id
    await this.repository.updateById(applicationClient, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const applicationClientRegister =
      this.publisher.mergeObjectContext(applicationClient);

    applicationClientRegister.updated({
      payload: applicationClient,
      cQMetadata,
    }); // apply event to model events
    applicationClientRegister.commit(); // commit all events of model
  }
}
