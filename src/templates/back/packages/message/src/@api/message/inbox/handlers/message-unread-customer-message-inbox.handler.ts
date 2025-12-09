import { MessageUpdateInboxByIdInput } from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account';
import {
    MessageFindInboxByIdQuery,
    MessageUpdateInboxByIdCommand,
} from '@app/message/inbox';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { MessageUpdateInboxByIdDto } from '../dto';

@Injectable()
export class MessageUnreadCustomerMessageInboxHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        inbox: MessageUpdateInboxByIdInput | MessageUpdateInboxByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean> {
        const currentInbox = await this.queryBus.ask(
            new MessageFindInboxByIdQuery(inbox.id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new MessageUpdateInboxByIdCommand(
                {
                    id: currentInbox.id,
                    isRead: false,
                },
                {
                    ...constraint,
                    where: {
                        ...constraint.where,
                        accountId: account.id,
                    },
                },
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        return true;
    }
}
