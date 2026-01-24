import { IamIAccountRepository } from '@app/iam/account';
import { IamAccountId } from '@app/iam/account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteAccountByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: IamIAccountRepository,
  ) {}

  async main(
    id: IamAccountId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const account = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(account.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const accountRegister = this.publisher.mergeObjectContext(account);

    accountRegister.deleted({
      payload: account,
      cQMetadata,
    }); // apply event to model events
    accountRegister.commit(); // commit all events of model
  }
}
