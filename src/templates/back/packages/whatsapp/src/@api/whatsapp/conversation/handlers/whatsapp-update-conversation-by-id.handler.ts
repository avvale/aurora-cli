import { WhatsappConversation, WhatsappUpdateConversationByIdInput } from '@api/graphql';
import { WhatsappConversationDto, WhatsappUpdateConversationByIdDto } from '@api/whatsapp/conversation';
import { WhatsappFindConversationByIdQuery, WhatsappUpdateConversationByIdCommand } from '@app/whatsapp/conversation';
import { diff, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappUpdateConversationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: WhatsappUpdateConversationByIdInput | WhatsappUpdateConversationByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<WhatsappConversation | WhatsappConversationDto>
    {
        const conversation = await this.queryBus.ask(new WhatsappFindConversationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, conversation);

        await this.commandBus.dispatch(new WhatsappUpdateConversationByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new WhatsappFindConversationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
