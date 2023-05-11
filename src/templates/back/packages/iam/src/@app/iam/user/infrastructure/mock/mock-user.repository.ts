import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IUserRepository } from '@app/iam/user/domain/user.repository';
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
    UserMeta,
    UserCreatedAt,
    UserUpdatedAt,
    UserDeletedAt,
} from '@app/iam/user/domain/value-objects';
import { IamUser } from '../../domain/user.aggregate';
import { users } from './mock-user.data';

@Injectable()
export class MockUserRepository extends MockRepository<IamUser> implements IUserRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamUser';
    public collectionSource: IamUser[];
    public deletedAtInstance: UserDeletedAt = new UserDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>users)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamUser.register(
                new UserId(itemCollection.id),
                new UserAccountId(itemCollection.accountId),
                new UserName(itemCollection.name),
                new UserSurname(itemCollection.surname),
                new UserAvatar(itemCollection.avatar),
                new UserMobile(itemCollection.mobile),
                new UserLangId(itemCollection.langId),
                new UserUsername(itemCollection.username),
                new UserPassword(itemCollection.password),
                new UserRememberToken(itemCollection.rememberToken),
                new UserMeta(itemCollection.meta),
                new UserCreatedAt(itemCollection.createdAt),
                new UserUpdatedAt(itemCollection.updatedAt),
                new UserDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}