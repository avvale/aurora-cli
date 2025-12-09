/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    MessageDeleteInboxSettingsHandler,
    MessageInboxSettingDto,
} from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[message] inbox-setting')
@Controller('message/inbox-settings/delete')
@Auth('message.inboxSetting.delete')
export class MessageDeleteInboxSettingsController {
    constructor(private readonly handler: MessageDeleteInboxSettingsHandler) {}

    @Delete()
    @ApiOperation({
        summary: 'Delete inbox-settings in batch according to query',
    })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [MessageInboxSettingDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
