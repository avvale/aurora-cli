/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappMessageDto, WhatsappUpdateMessageByIdDto, WhatsappUpdateMessageByIdHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] message')
@Controller('whatsapp/message/update')
@Auth('whatsapp.message.update')
export class WhatsappUpdateMessageByIdController
{
    constructor(
        private readonly handler: WhatsappUpdateMessageByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update message by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: WhatsappMessageDto })
    async main(
        @Body() payload: WhatsappUpdateMessageByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
