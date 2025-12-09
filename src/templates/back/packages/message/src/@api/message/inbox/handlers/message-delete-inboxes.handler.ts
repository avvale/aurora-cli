import { MessageInbox } from '@api/graphql';
import { MessageInboxDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import {
    MessageDeleteInboxesCommand,
    MessageGetInboxesQuery,
} from '@app/message/inbox';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageDeleteInboxesHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInbox[] | MessageInboxDto[]> {
        const inboxes = await this.queryBus.ask(
            new MessageGetInboxesQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new MessageDeleteInboxesCommand(queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return inboxes;
    }
}
