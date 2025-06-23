import { MessageCreateMessageInput, MessageMessage } from '@api/graphql';
import { MessageCreateMessageDto, MessageMessageDto } from '@api/message/message';
import { createMessage } from '@api/message/shared';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindMessageByIdQuery } from '@app/message/message';
import { AuditingMeta, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class MessageCreateMessageHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly moduleRef: ModuleRef,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: MessageCreateMessageInput | MessageCreateMessageDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageMessage | MessageMessageDto>
    {
        await createMessage({
            moduleRef: this.moduleRef,
            payload,
            timezone,
            auditing,
        });

        return await this.queryBus.ask(new MessageFindMessageByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
