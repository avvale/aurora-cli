import { MessageMessage, MessageUpdateMessageByIdInput } from '@api/graphql';
import { MessageMessageDto, MessageUpdateMessageByIdDto } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindMessageByIdQuery, MessageUpsertMessageCommand } from '@app/message/message';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpsertMessageHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: MessageUpdateMessageByIdInput | MessageUpdateMessageByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageMessage | MessageMessageDto>
    {
        await this.commandBus.dispatch(new MessageUpsertMessageCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new MessageFindMessageByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
