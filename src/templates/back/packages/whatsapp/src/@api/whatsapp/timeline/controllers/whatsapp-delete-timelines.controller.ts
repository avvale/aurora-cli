/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WhatsappDeleteTimelinesHandler, WhatsappTimelineDto } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] timeline')
@Controller('whatsapp/timelines/delete')
@Auth('whatsapp.timeline.delete')
export class WhatsappDeleteTimelinesController
{
    constructor(
        private readonly handler: WhatsappDeleteTimelinesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete timelines in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [WhatsappTimelineDto]})
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
