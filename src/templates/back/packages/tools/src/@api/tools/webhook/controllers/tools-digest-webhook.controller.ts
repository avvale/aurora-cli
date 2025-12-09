/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToolsDigestWebhookHandler } from '../handlers/tools-digest-webhook.handler';

@ApiTags('[tools] webhook')
@Controller('tools/webhook/digest')
export class ToolsDigestWebhookController {
    constructor(private readonly handler: ToolsDigestWebhookHandler) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({
        description: 'Defines the action performed',
        type: Boolean,
    })
    async main(@Headers() headers: any, @Body() payload: any) {
        return await this.handler.main(headers, payload);
    }
}
