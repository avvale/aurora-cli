import { IamAddRolesAccountsContextEvent, IamIRoleAccountRepository, IamRoleAccount } from '@app/iam/role-account';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateAndIncrementRolesAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleAccountRepository,
    ) {}

    async main(
        payload: {
            roleId?: IamRoleAccountRoleId;
            accountId?: IamRoleAccountAccountId;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const roleAccount = IamRoleAccount.register(
            payload.roleId,
            payload.accountId,
        );

        // update and increment
        await this.repository.updateAndIncrement(
            roleAccount,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const rolesAccounts = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const rolesAccountsRegister = this.publisher.mergeObjectContext(
            new IamAddRolesAccountsContextEvent(rolesAccounts),
        );

        rolesAccountsRegister.updatedAndIncremented(); // apply event to model events
        rolesAccountsRegister.commit(); // commit all events of model
    }
}
