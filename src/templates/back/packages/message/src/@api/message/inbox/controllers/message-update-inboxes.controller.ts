/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantPolicy } from '@api/iam/shared';
import {
    MessageInboxDto,
    MessageUpdateInboxesDto,
    MessageUpdateInboxesHandler,
} from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    CurrentAccount,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inboxes/update')
@Auth('message.inbox.update')
export class MessageUpdateInboxesController {
    constructor(private readonly handler: MessageUpdateInboxesHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update inboxes' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: MessageInboxDto,
    })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: MessageUpdateInboxesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            account,
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
