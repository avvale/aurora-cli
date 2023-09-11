/* eslint-disable key-spacing */
import { IamAccount } from '@app/iam/account';
import { IamCreatedUserEvent, IamDeletedUserEvent, IamUpdatedUserEvent } from '@app/iam/user';
import {
    IamUserAccountId,
    IamUserAvatar,
    IamUserCreatedAt,
    IamUserDeletedAt,
    IamUserId,
    IamUserLangId,
    IamUserMeta,
    IamUserMobile,
    IamUserName,
    IamUserPassword,
    IamUserRememberToken,
    IamUserSurname,
    IamUserUpdatedAt,
    IamUserUsername,
} from '@app/iam/user/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamUser extends AggregateRoot
{
    id: IamUserId;
    accountId: IamUserAccountId;
    name: IamUserName;
    surname: IamUserSurname;
    avatar: IamUserAvatar;
    mobile: IamUserMobile;
    langId: IamUserLangId;
    username: IamUserUsername;
    password: IamUserPassword;
    rememberToken: IamUserRememberToken;
    meta: IamUserMeta;
    createdAt: IamUserCreatedAt;
    updatedAt: IamUserUpdatedAt;
    deletedAt: IamUserDeletedAt;
    account: IamAccount;

    constructor(
        id: IamUserId,
        accountId: IamUserAccountId,
        name: IamUserName,
        surname: IamUserSurname,
        avatar: IamUserAvatar,
        mobile: IamUserMobile,
        langId: IamUserLangId,
        username: IamUserUsername,
        password: IamUserPassword,
        rememberToken: IamUserRememberToken,
        meta: IamUserMeta,
        createdAt: IamUserCreatedAt,
        updatedAt: IamUserUpdatedAt,
        deletedAt: IamUserDeletedAt,
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
        this.meta = meta;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.account = account;
    }

    static register(
        id: IamUserId,
        accountId: IamUserAccountId,
        name: IamUserName,
        surname: IamUserSurname,
        avatar: IamUserAvatar,
        mobile: IamUserMobile,
        langId: IamUserLangId,
        username: IamUserUsername,
        password: IamUserPassword,
        rememberToken: IamUserRememberToken,
        meta: IamUserMeta,
        createdAt: IamUserCreatedAt,
        updatedAt: IamUserUpdatedAt,
        deletedAt: IamUserDeletedAt,
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
            meta,
            createdAt,
            updatedAt,
            deletedAt,
            account,
        );
    }

    created(user: IamUser): void
    {
        this.apply(
            new IamCreatedUserEvent(
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
                user.meta?.value,
                user.createdAt?.value,
                user.updatedAt?.value,
                user.deletedAt?.value,
            ),
        );
    }

    updated(user: IamUser): void
    {
        this.apply(
            new IamUpdatedUserEvent(
                user.id?.value,
                user.accountId?.value,
                user.name?.value,
                user.surname?.value,
                user.avatar?.value,
                user.mobile?.value,
                user.langId?.value,
                user.username?.value,
                user.password?.value,
                user.rememberToken?.value,
                user.meta?.value,
                user.createdAt?.value,
                user.updatedAt?.value,
                user.deletedAt?.value,
            ),
        );
    }

    deleted(user: IamUser): void
    {
        this.apply(
            new IamDeletedUserEvent(
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
                user.meta?.value,
                user.createdAt?.value,
                user.updatedAt?.value,
                user.deletedAt?.value,
            ),
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
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            account: this.account?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
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
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            account: this.account?.toDTO(),
        };
    }
}
