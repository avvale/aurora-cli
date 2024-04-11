import { MessageInbox, MessageUpdateInboxByIdInput } from '@api/graphql';
import { MessageInboxDto, MessageUpdateInboxByIdDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindInboxByIdQuery, MessageUpsertInboxCommand } from '@app/message/inbox';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpsertInboxHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: MessageUpdateInboxByIdInput | MessageUpdateInboxByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInbox | MessageInboxDto>
    {
        await this.commandBus.dispatch(new MessageUpsertInboxCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new MessageFindInboxByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
