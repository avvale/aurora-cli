import {
    IamAddAccountsContextEvent,
    IamIAccountRepository,
} from '@app/iam/account';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteAccountsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIAccountRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get objects to delete
        const accounts = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (accounts.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddAccountsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const accountsRegistered = this.publisher.mergeObjectContext(
            new IamAddAccountsContextEvent(accounts, cQMetadata),
        );

        accountsRegistered.deleted(); // apply event to model events
        accountsRegistered.commit(); // commit all events of model
    }
}
