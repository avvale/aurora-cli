import {
  IamAddTenantsAccountsContextEvent,
  IamITenantAccountRepository,
} from '@app/iam/tenant-account';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteTenantsAccountsService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: IamITenantAccountRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const tenantsAccounts = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (tenantsAccounts.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddTenantsAccountsContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const tenantsAccountsRegistered = this.publisher.mergeObjectContext(
      new IamAddTenantsAccountsContextEvent(tenantsAccounts, cQMetadata),
    );

    tenantsAccountsRegistered.deleted(); // apply event to model events
    tenantsAccountsRegistered.commit(); // commit all events of model
  }
}
