import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    IamRoleRoleId,
    IamRoleAccountId,

} from '../../domain/value-objects';
import { IamIRoleAccountRepository } from '../../domain/iam-role-account.repository';
import { IamRoleAccount } from '../../domain/iam-role-account.aggregate';

@Injectable()
export class IamCreateRolesAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleAccountRepository,
    ) {}

    public async main(
        rolesAccounts: {
            roleId: IamRoleRoleId;
            accountId: IamRoleAccountId;

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