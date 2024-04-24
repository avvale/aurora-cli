/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappTimelineDto, WhatsappUpdateTimelinesDto, WhatsappUpdateTimelinesHandler } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] timeline')
@Controller('whatsapp/timelines/update')
@Auth('whatsapp.timeline.update')
export class WhatsappUpdateTimelinesController
{
    constructor(
        private readonly handler: WhatsappUpdateTimelinesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update timelines' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: WhatsappTimelineDto })
    async main(
        @Body() payload: WhatsappUpdateTimelinesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
