/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappFindTimelineHandler, WhatsappTimelineDto } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] timeline')
@Controller('whatsapp/timeline/find')
@Auth('whatsapp.timeline.get')
export class WhatsappFindTimelineController
{
    constructor(
        private readonly handler: WhatsappFindTimelineHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find timeline according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: WhatsappTimelineDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
