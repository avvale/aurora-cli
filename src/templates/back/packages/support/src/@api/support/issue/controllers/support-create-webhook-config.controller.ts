/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SupportCreateWebhookConfigHandler } from '../handlers/support-create-webhook-config.handler';

@ApiTags('[support] issue')
@Controller('support/config/create-webhook')
@Auth('support.issue.update')
export class SupportCreateWebhookConfigController {
    constructor(private readonly handler: SupportCreateWebhookConfigHandler) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({
        description: 'Defines the action performed',
        type: Boolean,
    })
    async main(
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(timezone, auditing);
    }
}
