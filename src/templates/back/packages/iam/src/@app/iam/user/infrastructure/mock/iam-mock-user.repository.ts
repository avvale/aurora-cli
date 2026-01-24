import { IamIUserRepository, iamMockUserData, IamUser } from '@app/iam/user';
import {
  IamUserAccountId,
  IamUserAvatar,
  IamUserCreatedAt,
  IamUserDeletedAt,
  IamUserId,
  IamUserIsTwoFactorAuthenticationEnabled,
  IamUserLangId,
  IamUserMeta,
  IamUserMobile,
  IamUserName,
  IamUserPassword,
  IamUserRememberToken,
  IamUserRowId,
  IamUserSurname,
  IamUserTwoFactorAuthenticationSecret,
  IamUserUpdatedAt,
} from '@app/iam/user/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMockUserRepository
  extends MockRepository<IamUser>
  implements IamIUserRepository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'IamUser';
  public collectionSource: IamUser[];

  constructor() {
    super();
    this.createSourceMockData();
  }

  public reset(): void {
    this.createSourceMockData();
  }

  private createSourceMockData(): void {
    this.collectionSource = [];
    const now = Utils.nowTimestamp();

    for (const itemCollection of <any[]>iamMockUserData) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        IamUser.register(
          new IamUserId(itemCollection.id),
          new IamUserRowId(itemCollection.rowId),
          new IamUserAccountId(itemCollection.accountId),
          new IamUserName(itemCollection.name),
          new IamUserSurname(itemCollection.surname),
          new IamUserAvatar(itemCollection.avatar),
          new IamUserMobile(itemCollection.mobile),
          new IamUserLangId(itemCollection.langId),
          new IamUserPassword(itemCollection.password),
          new IamUserIsTwoFactorAuthenticationEnabled(
            itemCollection.isTwoFactorAuthenticationEnabled,
          ),
          new IamUserTwoFactorAuthenticationSecret(
            itemCollection.twoFactorAuthenticationSecret,
          ),
          new IamUserRememberToken(itemCollection.rememberToken),
          new IamUserMeta(itemCollection.meta),
          new IamUserCreatedAt(itemCollection.createdAt),
          new IamUserUpdatedAt(itemCollection.updatedAt),
          new IamUserDeletedAt(itemCollection.deletedAt),
        ),
      );
    }
  }
}
