import { IamAddRolesAccountsContextEvent, IamIRoleAccountRepository } from '@app/iam/role-account';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteRolesAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleAccountRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const rolesAccounts = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (rolesAccounts.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddRolesAccountsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const rolesAccountsRegistered = this.publisher.mergeObjectContext(
            new IamAddRolesAccountsContextEvent(
                rolesAccounts,
                cQMetadata,
            ),
        );

        rolesAccountsRegistered.deleted(); // apply event to model events
        rolesAccountsRegistered.commit(); // commit all events of model
    }
}
