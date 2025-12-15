/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsGetWebhookLogsHandler,
    ToolsWebhookLogDto,
} from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] webhook-log')
@Controller('tools/webhook-logs/get')
@Auth('tools.webhookLog.get')
export class ToolsGetWebhookLogsController {
    constructor(private readonly handler: ToolsGetWebhookLogsHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get webhook-logs according to query' })
    @ApiOkResponse({
        description: 'The records has been found successfully.',
        type: [ToolsWebhookLogDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
