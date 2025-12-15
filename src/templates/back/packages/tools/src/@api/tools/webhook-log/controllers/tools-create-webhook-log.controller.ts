/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsCreateWebhookLogDto,
    ToolsCreateWebhookLogHandler,
    ToolsWebhookLogDto,
} from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] webhook-log')
@Controller('tools/webhook-log/create')
@Auth('tools.webhookLog.create')
export class ToolsCreateWebhookLogController {
    constructor(private readonly handler: ToolsCreateWebhookLogHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create webhook-log' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ToolsWebhookLogDto,
    })
    async main(
        @Body() payload: ToolsCreateWebhookLogDto,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(payload, timezone);
    }
}
