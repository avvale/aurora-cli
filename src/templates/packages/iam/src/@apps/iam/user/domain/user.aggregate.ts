/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from 'aurora-ts-core';
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
} from './value-objects';
import { CreatedUserEvent } from '../application/events/created-user.event';
import { UpdatedUserEvent } from '../application/events/updated-user.event';
import { DeletedUserEvent } from '../application/events/deleted-user.event';
import { IamAccount } from '../../../../@apps/iam/account/domain/account.aggregate';

export class IamUser extends AggregateRoot
{
    id: UserId;
    accountId: UserAccountId;
    name: UserName;
    surname: UserSurname;
    avatar: UserAvatar;
    mobile: UserMobile;
    langId: UserLangId;
    username: UserUsername;
    password: UserPassword;
    rememberToken: UserRememberToken;
    data: UserData;
    createdAt: UserCreatedAt;
    updatedAt: UserUpdatedAt;
    deletedAt: UserDeletedAt;

    // eager relationship
    account: IamAccount;

    constructor(
        id: UserId,
        accountId: UserAccountId,
        name: UserName,
        surname: UserSurname,
        avatar: UserAvatar,
        mobile: UserMobile,
        langId: UserLangId,
        username: UserUsername,
        password: UserPassword,
        rememberToken: UserRememberToken,
        data: UserData,
        createdAt: UserCreatedAt,
        updatedAt: UserUpdatedAt,
        deletedAt: UserDeletedAt,

        account?: IamAccount,
    )
    {
        super();
        this.id = id;
        this.accountId = accountId;
        this.name = name;
        this.surname = surname;
        this.avatar = avatar;
        this.mobile = mobile;
        this.langId = langId;
        this.username = username;
        this.password = password;
        this.rememberToken = rememberToken;
        this.data = data;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.account = account;
    }

    static register (
        id: UserId,
        accountId: UserAccountId,
        name: UserName,
        surname: UserSurname,
        avatar: UserAvatar,
        mobile: UserMobile,
        langId: UserLangId,
        username: UserUsername,
        password: UserPassword,
        rememberToken: UserRememberToken,
        data: UserData,
        createdAt: UserCreatedAt,
        updatedAt: UserUpdatedAt,
        deletedAt: UserDeletedAt,

        account?: IamAccount,
    ): IamUser
    {
        return new IamUser(
            id,
            accountId,
            name,
            surname,
            avatar,
            mobile,
            langId,
            username,
            password,
            rememberToken,
            data,
            createdAt,
            updatedAt,
            deletedAt,

            account,
        );
    }

    created(user: IamUser): void
    {
        this.apply(
            new CreatedUserEvent(
                user.id.value,
                user.accountId.value,
                user.name.value,
                user.surname?.value,
                user.avatar?.value,
                user.mobile?.value,
                user.langId?.value,
                user.username.value,
                user.password.value,
                user.rememberToken?.value,
                user.data?.value,
                user.createdAt?.value,
                user.updatedAt?.value,
                user.deletedAt?.value,
            )
        );
    }

    updated(user: IamUser): void
    {
        this.apply(
            new UpdatedUserEvent(
                user.id.value,
                user.accountId?.value,
                user.name?.value,
                user.surname?.value,
                user.avatar?.value,
                user.mobile?.value,
                user.langId?.value,
                user.username?.value,
                user.password?.value,
                user.rememberToken?.value,
                user.data?.value,
                user.createdAt?.value,
                user.updatedAt?.value,
                user.deletedAt?.value,
            )
        );
    }

    deleted(user: IamUser): void
    {
        this.apply(
            new DeletedUserEvent(
                user.id.value,
                user.accountId.value,
                user.name.value,
                user.surname?.value,
                user.avatar?.value,
                user.mobile?.value,
                user.langId?.value,
                user.username.value,
                user.password.value,
                user.rememberToken?.value,
                user.data?.value,
                user.createdAt?.value,
                user.updatedAt?.value,
                user.deletedAt?.value,
            )
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            accountId: this.accountId.value,
            name: this.name.value,
            surname: this.surname?.value,
            avatar: this.avatar?.value,
            mobile: this.mobile?.value,
            langId: this.langId?.value,
            username: this.username.value,
            password: this.password.value,
            rememberToken: this.rememberToken?.value,
            data: this.data?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            account: this.account?.toDTO(),
        };
    }


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
