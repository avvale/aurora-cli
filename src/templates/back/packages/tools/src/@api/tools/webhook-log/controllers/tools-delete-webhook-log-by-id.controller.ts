/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsDeleteWebhookLogByIdHandler,
    ToolsWebhookLogDto,
} from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] webhook-log')
@Controller('tools/webhook-log/delete')
@Auth('tools.webhookLog.delete')
export class ToolsDeleteWebhookLogByIdController {
    constructor(private readonly handler: ToolsDeleteWebhookLogByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete webhook-log by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: ToolsWebhookLogDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
