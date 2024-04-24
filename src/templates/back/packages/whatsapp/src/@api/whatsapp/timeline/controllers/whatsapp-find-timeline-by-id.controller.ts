/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappFindTimelineByIdHandler, WhatsappTimelineDto } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] timeline')
@Controller('whatsapp/timeline/find')
@Auth('whatsapp.timeline.get')
export class WhatsappFindTimelineByIdController
{
    constructor(
        private readonly handler: WhatsappFindTimelineByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find timeline by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: WhatsappTimelineDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
