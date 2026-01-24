import {
  IamAddUsersContextEvent,
  IamIUserRepository,
  IamUser,
} from '@app/iam/user';
import {
  IamUserAccountId,
  IamUserAvatar,
  IamUserId,
  IamUserIsTwoFactorAuthenticationEnabled,
  IamUserLangId,
  IamUserMeta,
  IamUserMobile,
  IamUserName,
  IamUserPassword,
  IamUserRememberToken,
  IamUserSurname,
  IamUserTwoFactorAuthenticationSecret,
  IamUserUpdatedAt,
} from '@app/iam/user/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateUsersService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: IamIUserRepository,
  ) {}

  async main(
    payload: {
      id?: IamUserId;
      accountId?: IamUserAccountId;
      name?: IamUserName;
      surname?: IamUserSurname;
      avatar?: IamUserAvatar;
      mobile?: IamUserMobile;
      langId?: IamUserLangId;
      password?: IamUserPassword;
      isTwoFactorAuthenticationEnabled?: IamUserIsTwoFactorAuthenticationEnabled;
      twoFactorAuthenticationSecret?: IamUserTwoFactorAuthenticationSecret;
      rememberToken?: IamUserRememberToken;
      meta?: IamUserMeta;
    },
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const user = IamUser.register(
      payload.id,
      undefined, // rowId
      payload.accountId,
      payload.name,
      payload.surname,
      payload.avatar,
      payload.mobile,
      payload.langId,
      payload.password,
      payload.isTwoFactorAuthenticationEnabled,
      payload.twoFactorAuthenticationSecret,
      payload.rememberToken,
      payload.meta,
      null, // createdAt
      new IamUserUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    // update
    await this.repository.update(user, {
      queryStatement,
      constraint,
      cQMetadata,
      updateOptions: cQMetadata?.repositoryOptions,
    });

    // get objects to delete
    const users = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const usersRegister = this.publisher.mergeObjectContext(
      new IamAddUsersContextEvent(users, cQMetadata),
    );

    usersRegister.updated(); // apply event to model events
    usersRegister.commit(); // commit all events of model
  }
}
