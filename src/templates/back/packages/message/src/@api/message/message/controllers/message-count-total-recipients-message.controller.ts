/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { QueryStatement } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageCountTotalRecipientsMessageHandler } from '../handlers/message-count-total-recipients-message.handler';

@ApiTags('[message] message')
@Controller('message/message/count-total-recipients')
@Auth('message.message.update')
export class MessageCountTotalRecipientsMessageController {
    constructor(
        private readonly handler: MessageCountTotalRecipientsMessageHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({
        description: 'Defines the action performed',
        type: Boolean,
    })
    async main(
        @Body('tenantRecipientIds') tenantRecipientIds: string[],
        @Body('scopeRecipients') scopeRecipients: string[],
        @Body('tagRecipients') tagRecipients: string[],
        @Body('accountRecipientIds') accountRecipientIds: string[],
        @Body('constraint') constraint?: QueryStatement,
    ) {
        return await this.handler.main(
            tenantRecipientIds,
            scopeRecipients,
            tagRecipients,
            accountRecipientIds,
            constraint,
        );
    }
}
