/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappTimelineDto, WhatsappUpdateTimelineByIdDto, WhatsappUpdateTimelineByIdHandler } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] timeline')
@Controller('whatsapp/timeline/update')
@Auth('whatsapp.timeline.update')
export class WhatsappUpdateTimelineByIdController
{
    constructor(
        private readonly handler: WhatsappUpdateTimelineByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update timeline by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: WhatsappTimelineDto })
    async main(
        @Body() payload: WhatsappUpdateTimelineByIdDto,
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
