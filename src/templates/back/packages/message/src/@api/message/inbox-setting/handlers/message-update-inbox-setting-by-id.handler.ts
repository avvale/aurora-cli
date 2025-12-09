import {
    MessageInboxSetting,
    MessageUpdateInboxSettingByIdInput,
} from '@api/graphql';
import {
    MessageInboxSettingDto,
    MessageUpdateInboxSettingByIdDto,
} from '@api/message/inbox-setting';
import {
    MessageFindInboxSettingByIdQuery,
    MessageUpdateInboxSettingByIdCommand,
} from '@app/message/inbox-setting';
import {
    AuditingMeta,
    diff,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpdateInboxSettingByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload:
            | MessageUpdateInboxSettingByIdInput
            | MessageUpdateInboxSettingByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<MessageInboxSetting | MessageInboxSettingDto> {
        const inboxSetting = await this.queryBus.ask(
            new MessageFindInboxSettingByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );

        const dataToUpdate = diff(payload, inboxSetting);

        await this.commandBus.dispatch(
            new MessageUpdateInboxSettingByIdCommand(
                {
                    ...dataToUpdate,
                    id: payload.id,
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

        return await this.queryBus.ask(
            new MessageFindInboxSettingByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );
    }
}
