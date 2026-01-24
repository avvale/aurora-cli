import {
  IamIRoleAccountRepository,
  IamRoleAccount,
} from '@app/iam/role-account';
import {
  IamRoleAccountAccountId,
  IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateRoleAccountByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: IamIRoleAccountRepository,
  ) {}

  async main(
    payload: {
      roleId: IamRoleAccountRoleId;
      accountId: IamRoleAccountAccountId;
    },
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const roleAccount = IamRoleAccount.register(
      payload.roleId,
      payload.accountId,
    );

    // update by id
    await this.repository.updateById(roleAccount, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const roleAccountRegister = this.publisher.mergeObjectContext(roleAccount);

    roleAccountRegister.updated({
      payload: roleAccount,
      cQMetadata,
    }); // apply event to model events
    roleAccountRegister.commit(); // commit all events of model
  }
}
