/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MessageInboxSettingDto, MessageUpdateInboxSettingByIdDto, MessageUpsertInboxSettingHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox-setting')
@Controller('message/inbox-setting/upsert')
@Auth('message.inboxSetting.upsert')
export class MessageUpsertInboxSettingController
{
    constructor(
        private readonly handler: MessageUpsertInboxSettingHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert inbox-setting' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: MessageInboxSettingDto })
    async main(
        @Body() payload: MessageUpdateInboxSettingByIdDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
