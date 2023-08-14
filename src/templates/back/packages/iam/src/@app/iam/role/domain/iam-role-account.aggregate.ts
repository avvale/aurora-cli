import { LiteralObject} from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';
import {
    IamRoleRoleId,
    IamRoleAccountId,
} from './value-objects';

export class IamRoleAccount extends AggregateRoot
{
    roleId: IamRoleRoleId;
    accountId: IamRoleAccountId;

    constructor(roleId?: IamRoleRoleId, accountId?: IamRoleAccountId)
    {
        super();

        this.roleId = roleId;
        this.accountId = accountId;
    }

    static register (roleId: IamRoleRoleId, accountId: IamRoleAccountId): IamRoleAccount
    {
        return new IamRoleAccount(roleId, accountId);
    }

    toDTO(): LiteralObject
    {
        return {
            roleId   : this.roleId.value,
            accountId: this.accountId.value,
        };
    }

    toRepository(): LiteralObject
    {
        return {
            roleId   : this.roleId.value,
            accountId: this.accountId.value,
        };
    }
}