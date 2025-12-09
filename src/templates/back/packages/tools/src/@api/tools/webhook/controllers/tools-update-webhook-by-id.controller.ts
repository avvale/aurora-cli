/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ToolsUpdateWebhookByIdDto,
    ToolsUpdateWebhookByIdHandler,
    ToolsWebhookDto,
} from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] webhook')
@Controller('tools/webhook/update')
@Auth('tools.webhook.update')
export class ToolsUpdateWebhookByIdController {
    constructor(private readonly handler: ToolsUpdateWebhookByIdHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update webhook by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: ToolsWebhookDto,
    })
    async main(
        @Body() payload: ToolsUpdateWebhookByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
