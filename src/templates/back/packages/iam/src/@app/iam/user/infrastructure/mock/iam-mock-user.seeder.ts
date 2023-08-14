import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    IamUserId,
    IamUserAccountId,
    IamUserName,
    IamUserSurname,
    IamUserAvatar,
    IamUserMobile,
    IamUserLangId,
    IamUserUsername,
    IamUserPassword,
    IamUserRememberToken,
    IamUserMeta,
    IamUserCreatedAt,
    IamUserUpdatedAt,
    IamUserDeletedAt,
} from '../../domain/value-objects';
import { IamUser } from '../../domain/iam-user.aggregate';
import { iamMockUserData } from './iam-mock-user.data';
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
                    new IamUserUsername(user.username),
                    new IamUserPassword(user.password, {}, { haveToEncrypt: true }),
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
