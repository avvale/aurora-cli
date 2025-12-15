/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsUpdateWebhookLogByIdDto,
    ToolsUpdateWebhookLogByIdHandler,
    ToolsWebhookLogDto,
} from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] webhook-log')
@Controller('tools/webhook-log/update')
@Auth('tools.webhookLog.update')
export class ToolsUpdateWebhookLogByIdController {
    constructor(private readonly handler: ToolsUpdateWebhookLogByIdHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update webhook-log by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: ToolsWebhookLogDto,
    })
    async main(
        @Body() payload: ToolsUpdateWebhookLogByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(payload, constraint, timezone);
    }
}
