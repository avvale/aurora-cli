/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantPolicy } from '@api/iam/shared';
import {
    MessageCreateMessageDto,
    MessageCreateMessageHandler,
    MessageMessageDto,
} from '@api/message/message';
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

@ApiTags('[message] message')
@Controller('message/message/create')
@Auth('message.message.create')
export class MessageCreateMessageController {
    constructor(private readonly handler: MessageCreateMessageHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create message' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: MessageMessageDto,
    })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: MessageCreateMessageDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(account, payload, timezone, auditing);
    }
}
