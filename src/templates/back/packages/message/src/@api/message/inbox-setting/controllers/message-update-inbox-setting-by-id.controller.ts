/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MessageInboxSettingDto, MessageUpdateInboxSettingByIdDto, MessageUpdateInboxSettingByIdHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox-setting')
@Controller('message/inbox-setting/update')
@Auth('message.inboxSetting.update')
export class MessageUpdateInboxSettingByIdController
{
    constructor(
        private readonly handler: MessageUpdateInboxSettingByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update inbox-setting by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: MessageInboxSettingDto })
    async main(
        @Body() payload: MessageUpdateInboxSettingByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
