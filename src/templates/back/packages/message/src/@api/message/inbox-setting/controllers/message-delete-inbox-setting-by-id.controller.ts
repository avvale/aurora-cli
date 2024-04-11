/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MessageDeleteInboxSettingByIdHandler, MessageInboxSettingDto } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox-setting')
@Controller('message/inbox-setting/delete')
@Auth('message.inboxSetting.delete')
export class MessageDeleteInboxSettingByIdController
{
    constructor(
        private readonly handler: MessageDeleteInboxSettingByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete inbox-setting by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: MessageInboxSettingDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}
