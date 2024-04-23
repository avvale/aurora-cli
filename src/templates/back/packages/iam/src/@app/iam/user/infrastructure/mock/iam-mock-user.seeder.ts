import { iamMockUserData, IamUser } from '@app/iam/user';
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
    IamUserSurname,
    IamUserTwoFactorAuthenticationSecret,
    IamUserUpdatedAt,
} from '@app/iam/user/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class IamMockUserSeeder extends MockSeeder<IamUser>
{
    public collectionSource: IamUser[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const user of _.orderBy(iamMockUserData, ['id']))
        {
            this.collectionSource.push(
                IamUser.register(
                    new IamUserId(user.id),
                    new IamUserAccountId(user.accountId),
                    new IamUserName(user.name),
                    new IamUserSurname(user.surname),
                    new IamUserAvatar(user.avatar),
                    new IamUserMobile(user.mobile),
                    new IamUserLangId(user.langId),
                    new IamUserPassword(user.password, {}, { haveToEncrypt: true }),
                    new IamUserIsTwoFactorAuthenticationEnabled(user.isTwoFactorAuthenticationEnabled),
                    new IamUserTwoFactorAuthenticationSecret(user.twoFactorAuthenticationSecret),
                    new IamUserRememberToken(user.rememberToken),
                    new IamUserMeta(user.meta),
                    new IamUserCreatedAt({ currentTimestamp: true }),
                    new IamUserUpdatedAt({ currentTimestamp: true }),
                    new IamUserDeletedAt(null),
                ),
            );
        }
    }
}
