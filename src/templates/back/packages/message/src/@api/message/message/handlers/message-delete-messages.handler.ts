import { MessageMessage } from '@api/graphql';
import { MessageMessageDto } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import {
    MessageDeleteMessagesCommand,
    MessageGetMessagesQuery,
} from '@app/message/message';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageDeleteMessagesHandler {
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
    ): Promise<MessageMessage[] | MessageMessageDto[]> {
        const messages = await this.queryBus.ask(
            new MessageGetMessagesQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new MessageDeleteMessagesCommand(queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return messages;
    }
}
