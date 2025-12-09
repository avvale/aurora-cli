/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    MessageCreateInboxSettingDto,
    MessageCreateInboxSettingHandler,
    MessageInboxSettingDto,
} from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox-setting')
@Controller('message/inbox-setting/create')
@Auth('message.inboxSetting.create')
export class MessageCreateInboxSettingController {
    constructor(private readonly handler: MessageCreateInboxSettingHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create inbox-setting' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: MessageInboxSettingDto,
    })
    async main(
        @Body() payload: MessageCreateInboxSettingDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
