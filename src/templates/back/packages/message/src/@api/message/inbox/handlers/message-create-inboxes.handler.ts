import { MessageCreateInboxInput } from '@api/graphql';
import { MessageCreateInboxDto } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { MessageCreateInboxesCommand } from '@app/message/inbox';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCreateInboxesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: MessageCreateInboxInput[] | MessageCreateInboxDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new MessageCreateInboxesCommand(
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
