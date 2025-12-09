import { MessageCreateInboxInput, MessageInbox } from '@api/graphql';
import { MessageCreateInboxDto, MessageInboxDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import {
    MessageCreateInboxCommand,
    MessageFindInboxByIdQuery,
} from '@app/message/inbox';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCreateInboxHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: MessageCreateInboxInput | MessageCreateInboxDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInbox | MessageInboxDto> {
        await this.commandBus.dispatch(
            new MessageCreateInboxCommand(payload, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return await this.queryBus.ask(
            new MessageFindInboxByIdQuery(
                payload.id,
                {},
                {
                    timezone,
                },
            ),
        );
    }
}
