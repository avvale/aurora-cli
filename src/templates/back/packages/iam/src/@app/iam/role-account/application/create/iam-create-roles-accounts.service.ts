import {
    IamAddRolesAccountsContextEvent,
    IamIRoleAccountRepository,
    IamRoleAccount,
} from '@app/iam/role-account';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateRolesAccountsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleAccountRepository,
    ) {}

    async main(
        payload: {
            roleId: IamRoleAccountRoleId;
            accountId: IamRoleAccountAccountId;
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const rolesAccounts = payload.map((roleAccount) =>
            IamRoleAccount.register(roleAccount.roleId, roleAccount.accountId),
        );

        // insert
        await this.repository.insert(rolesAccounts, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddRolesAccountsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const rolesAccountsRegistered = this.publisher.mergeObjectContext(
            new IamAddRolesAccountsContextEvent(rolesAccounts, cQMetadata),
        );

        rolesAccountsRegistered.created(); // apply event to model events
        rolesAccountsRegistered.commit(); // commit all events of model
    }
}
