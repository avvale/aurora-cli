import { WhatsappMessage, WhatsappUpdateMessageByIdInput } from '@api/graphql';
import { WhatsappMessageDto, WhatsappUpdateMessageByIdDto } from '@api/whatsapp/message';
import { WhatsappFindMessageByIdQuery, WhatsappUpdateMessageByIdCommand } from '@app/whatsapp/message';
import { diff, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappUpdateMessageByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: WhatsappUpdateMessageByIdInput | WhatsappUpdateMessageByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappMessage | WhatsappMessageDto>
    {
        const message = await this.queryBus.ask(new WhatsappFindMessageByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, message);

        await this.commandBus.dispatch(new WhatsappUpdateMessageByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new WhatsappFindMessageByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
