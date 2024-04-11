import { MessageCreateOutboxInput } from '@api/graphql';
import { MessageCreateOutboxDto } from '@api/message/outbox';
import { MessageCreateOutboxesCommand } from '@app/message/outbox';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCreateOutboxesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: MessageCreateOutboxInput[] | MessageCreateOutboxDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new MessageCreateOutboxesCommand(
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
