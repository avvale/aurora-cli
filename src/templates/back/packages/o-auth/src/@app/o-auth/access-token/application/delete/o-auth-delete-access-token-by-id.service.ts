import { OAuthIAccessTokenRepository } from '@app/o-auth/access-token';
import { OAuthAccessTokenId } from '@app/o-auth/access-token/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthDeleteAccessTokenByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: OAuthIAccessTokenRepository,
  ) {}

  async main(
    id: OAuthAccessTokenId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const accessToken = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(accessToken.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const accessTokenRegister = this.publisher.mergeObjectContext(accessToken);

    accessTokenRegister.deleted({
      payload: accessToken,
      cQMetadata,
    }); // apply event to model events
    accessTokenRegister.commit(); // commit all events of model
  }
}
