/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    MessageCreateInboxSettingDto,
    MessageCreateInboxSettingsHandler,
    MessageInboxSettingDto,
} from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[message] inbox-setting')
@Controller('message/inbox-settings/create')
@Auth('message.inboxSetting.create')
export class MessageCreateInboxSettingsController {
    constructor(private readonly handler: MessageCreateInboxSettingsHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create inbox-settings in batch' })
    @ApiCreatedResponse({
        description: 'The records has been created successfully.',
        type: [MessageInboxSettingDto],
    })
    @ApiBody({ type: [MessageCreateInboxSettingDto] })
    async main(
        @Body() payload: MessageCreateInboxSettingDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
