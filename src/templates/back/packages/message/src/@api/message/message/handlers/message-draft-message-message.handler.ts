import {
    MessageMessageStatus,
    MessageUpdateMessageByIdInput,
} from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account';
import { MessageUpdateMessageByIdCommand } from '@app/message/message';
import { MessageDeleteOutboxesCommand } from '@app/message/outbox';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { MessageUpdateMessageByIdDto } from '../dto';

@Injectable()
export class MessageDraftMessageMessageHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        message: MessageUpdateMessageByIdInput | MessageUpdateMessageByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean> {
        await this.commandBus.dispatch(
            new MessageUpdateMessageByIdCommand(
                {
                    status: MessageMessageStatus.DRAFT,
                    id: message.id,
                },
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        await this.commandBus.dispatch(
            new MessageDeleteOutboxesCommand(
                {
                    where: {
                        messageId: message.id,
                    },
                },
                constraint,
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
