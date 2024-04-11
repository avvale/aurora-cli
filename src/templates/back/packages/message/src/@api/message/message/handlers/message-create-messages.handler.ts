import { MessageCreateMessageInput } from '@api/graphql';
import { MessageCreateMessageDto } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { MessageCreateMessagesCommand } from '@app/message/message';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCreateMessagesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: MessageCreateMessageInput[] | MessageCreateMessageDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new MessageCreateMessagesCommand(
            payload.map((message: MessageCreateMessageInput | MessageCreateMessageDto) => ({
                ...message,
                totalRecipients: 0,
                reads          : 0,
            })),
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return true;
    }
}
