import { MessageMessage } from '@api/graphql';
import { MessageMessageDto } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { MessageDeleteMessageByIdCommand, MessageFindMessageByIdQuery } from '@app/message/message';
import { MessageDeleteOutboxesCommand } from '@app/message/outbox';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, storagePublicAbsolutePath } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'node:fs';

@Injectable()
export class MessageDeleteMessageByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageMessage | MessageMessageDto>
    {
        const message = await this.queryBus.ask(new MessageFindMessageByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new MessageDeleteMessageByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        // delete message from outbox too
        await this.commandBus.dispatch(new MessageDeleteOutboxesCommand(
            {
                where: {
                    messageId: id,
                },
            },
            {},
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        if (Array.isArray(message.attachments))
        {
            for (const attachment of message.attachments)
            {
                // delete attachment file
                const absolutePath = storagePublicAbsolutePath(
                    attachment.relativePathSegments,
                    attachment.filename,
                );
                if (existsSync(absolutePath)) unlinkSync(absolutePath);
            }
        }

        return message;
    }
}
