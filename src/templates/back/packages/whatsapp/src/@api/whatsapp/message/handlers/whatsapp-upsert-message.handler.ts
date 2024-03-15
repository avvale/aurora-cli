import { WhatsappMessage, WhatsappUpdateMessageByIdInput } from '@api/graphql';
import { WhatsappMessageDto, WhatsappUpdateMessageByIdDto } from '@api/whatsapp/message';
import { WhatsappFindMessageByIdQuery, WhatsappUpsertMessageCommand } from '@app/whatsapp/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappUpsertMessageHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: WhatsappUpdateMessageByIdInput | WhatsappUpdateMessageByIdDto,
        timezone?: string,
    ): Promise<WhatsappMessage | WhatsappMessageDto>
    {
        await this.commandBus.dispatch(new WhatsappUpsertMessageCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new WhatsappFindMessageByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
