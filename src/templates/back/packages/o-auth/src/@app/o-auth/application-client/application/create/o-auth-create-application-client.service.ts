import {
  OAuthApplicationClient,
  OAuthIApplicationClientRepository,
} from '@app/o-auth/application-client';
import {
  OAuthApplicationClientApplicationId,
  OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthCreateApplicationClientService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: OAuthIApplicationClientRepository,
  ) {}

  async main(
    payload: {
      applicationId: OAuthApplicationClientApplicationId;
      clientId: OAuthApplicationClientClientId;
    },
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const applicationClient = OAuthApplicationClient.register(
      payload.applicationId,
      payload.clientId,
    );

    await this.repository.create(applicationClient, {
      createOptions: cQMetadata?.repositoryOptions,
      finderQueryStatement: (aggregate: OAuthApplicationClient) => ({
        where: {
          applicationId: aggregate['applicationId']['value'],
          clientId: aggregate['clientId']['value'],
        },
      }),
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const applicationClientRegister =
      this.publisher.mergeObjectContext(applicationClient);

    applicationClientRegister.created({
      payload: applicationClient,
      cQMetadata,
    }); // apply event to model events
    applicationClientRegister.commit(); // commit all events of model
  }
}
