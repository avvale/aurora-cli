/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantPolicy } from '@api/iam/shared';
import {
    MessageCreateInboxDto,
    MessageCreateInboxHandler,
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
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inbox/create')
@Auth('message.inbox.create')
export class MessageCreateInboxController {
    constructor(private readonly handler: MessageCreateInboxHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create inbox' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: MessageInboxDto,
    })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: MessageCreateInboxDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(account, payload, timezone, auditing);
    }
}
