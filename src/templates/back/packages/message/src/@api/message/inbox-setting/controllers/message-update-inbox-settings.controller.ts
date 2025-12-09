/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    MessageInboxSettingDto,
    MessageUpdateInboxSettingsDto,
    MessageUpdateInboxSettingsHandler,
} from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox-setting')
@Controller('message/inbox-settings/update')
@Auth('message.inboxSetting.update')
export class MessageUpdateInboxSettingsController {
    constructor(private readonly handler: MessageUpdateInboxSettingsHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update inbox-settings' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: MessageInboxSettingDto,
    })
    async main(
        @Body() payload: MessageUpdateInboxSettingsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
