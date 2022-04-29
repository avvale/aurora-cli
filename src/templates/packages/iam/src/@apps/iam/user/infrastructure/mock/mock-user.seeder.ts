import { Injectable } from '@nestjs/common';
import { MockSeeder } from 'aurora-ts-core';
import {
    UserId,
    UserAccountId,
    UserName,
    UserSurname,
    UserAvatar,
    UserMobile,
    UserLangId,
    UserUsername,
    UserPassword,
    UserRememberToken,
    UserData,
    UserCreatedAt,
    UserUpdatedAt,
    UserDeletedAt,
} from '../../domain/value-objects';
import { IamUser } from '../../domain/user.aggregate';
import { users } from '../seeds/user.seed';
import * as _ from 'lodash';

@Injectable()
export class MockUserSeeder extends MockSeeder<IamUser>
{
    public collectionSource: IamUser[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (const user of _.orderBy(users, ['id']))
        {
            this.collectionSource.push(
                IamUser.register(
                    new UserId(user.id),
                    new UserAccountId(user.accountId),
                    new UserName(user.name),
                    new UserSurname(user.surname),
                    new UserAvatar(user.avatar),
                    new UserMobile(user.mobile),
                    new UserLangId(user.langId),
                    new UserUsername(user.username),
                    new UserPassword(user.password),
                    new UserRememberToken(user.rememberToken),
                    new UserData(user.data),
                    new UserCreatedAt({ currentTimestamp: true }),
                    new UserUpdatedAt({ currentTimestamp: true }),
                    new UserDeletedAt(null),
                ),
            );
        }
    }
}