/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantPolicy } from '@api/iam/shared';
import {
    MessageCreateInboxDto,
    MessageCreateInboxesHandler,
    MessageInboxDto,
} from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    CurrentAccount,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inboxes/create')
@Auth('message.inbox.create')
export class MessageCreateInboxesController {
    constructor(private readonly handler: MessageCreateInboxesHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create inboxes in batch' })
    @ApiCreatedResponse({
        description: 'The records has been created successfully.',
        type: [MessageInboxDto],
    })
    @ApiBody({ type: [MessageCreateInboxDto] })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: MessageCreateInboxDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(account, payload, timezone, auditing);
    }
}
