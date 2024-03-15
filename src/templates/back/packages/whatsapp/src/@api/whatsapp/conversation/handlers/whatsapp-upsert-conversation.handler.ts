import { WhatsappConversation, WhatsappUpdateConversationByIdInput } from '@api/graphql';
import { WhatsappConversationDto, WhatsappUpdateConversationByIdDto } from '@api/whatsapp/conversation';
import { WhatsappFindConversationByIdQuery, WhatsappUpsertConversationCommand } from '@app/whatsapp/conversation';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappUpsertConversationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: WhatsappUpdateConversationByIdInput | WhatsappUpdateConversationByIdDto,
        timezone?: string,
    ): Promise<WhatsappConversation | WhatsappConversationDto>
    {
        await this.commandBus.dispatch(new WhatsappUpsertConversationCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new WhatsappFindConversationByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
