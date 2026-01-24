import { IamAddUsersContextEvent, IamIUserRepository } from '@app/iam/user';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteUsersService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: IamIUserRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const users = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (users.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddUsersContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const usersRegistered = this.publisher.mergeObjectContext(
      new IamAddUsersContextEvent(users, cQMetadata),
    );

    usersRegistered.deleted(); // apply event to model events
    usersRegistered.commit(); // commit all events of model
  }
}
