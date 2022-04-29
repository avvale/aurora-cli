import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    RoleRoleId,
    RoleAccountId,

} from './../../domain/value-objects';
import { IRoleAccountRepository } from './../../domain/role-account.repository';
import { IamRoleAccount } from './../../domain/role-account.aggregate';

@Injectable()
export class CreateRolesAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleAccountRepository,
    ) {}

    public async main(
        rolesAccounts: {
            roleId: RoleRoleId;
            accountId: RoleAccountId;

        } [],
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateRolesAccounts = rolesAccounts.map(roleAccount => IamRoleAccount.register(
            roleAccount.roleId,
            roleAccount.accountId,
        ));

        // insert
        await this.repository.insert(aggregateRolesAccounts);
    }
}