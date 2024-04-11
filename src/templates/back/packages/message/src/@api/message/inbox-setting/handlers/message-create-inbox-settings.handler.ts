import { MessageCreateInboxSettingInput } from '@api/graphql';
import { MessageCreateInboxSettingDto } from '@api/message/inbox-setting';
import { MessageCreateInboxSettingsCommand } from '@app/message/inbox-setting';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCreateInboxSettingsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: MessageCreateInboxSettingInput[] | MessageCreateInboxSettingDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new MessageCreateInboxSettingsCommand(
            payload,
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
