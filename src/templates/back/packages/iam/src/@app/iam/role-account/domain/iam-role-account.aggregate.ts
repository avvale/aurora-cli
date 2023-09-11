/* eslint-disable key-spacing */
import { IamAccount } from '@app/iam/account';
import { IamRole } from '@app/iam/role';
import { IamCreatedRoleAccountEvent, IamDeletedRoleAccountEvent, IamUpdatedRoleAccountEvent } from '@app/iam/role-account';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamRoleAccount extends AggregateRoot
{
    roleId: IamRoleAccountRoleId;
    accountId: IamRoleAccountAccountId;
    role: IamRole;
    account: IamAccount;

    constructor(
        roleId: IamRoleAccountRoleId,
        accountId: IamRoleAccountAccountId,
        role?: IamRole,
        account?: IamAccount,
    )
    {
        super();
        this.roleId = roleId;
        this.accountId = accountId;
        this.role = role;
        this.account = account;
    }

    static register(
        roleId: IamRoleAccountRoleId,
        accountId: IamRoleAccountAccountId,
        role?: IamRole,
        account?: IamAccount,
    ): IamRoleAccount
    {
        return new IamRoleAccount(
            roleId,
            accountId,
            role,
            account,
        );
    }

    created(roleAccount: IamRoleAccount): void
    {
        this.apply(
            new IamCreatedRoleAccountEvent(
                roleAccount.roleId.value,
                roleAccount.accountId.value,
            ),
        );
    }

    updated(roleAccount: IamRoleAccount): void
    {
        this.apply(
            new IamUpdatedRoleAccountEvent(
                roleAccount.roleId?.value,
                roleAccount.accountId?.value,
            ),
        );
    }

    deleted(roleAccount: IamRoleAccount): void
    {
        this.apply(
            new IamDeletedRoleAccountEvent(
                roleAccount.roleId.value,
                roleAccount.accountId.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            roleId: this.roleId.value,
            accountId: this.accountId.value,
            role: this.role?.toDTO(),
            account: this.account?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            roleId: this.roleId.value,
            accountId: this.accountId.value,
            role: this.role?.toDTO(),
            account: this.account?.toDTO(),
        };
    }
}
