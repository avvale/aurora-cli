/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantPolicy } from '@api/iam/shared';
import { MessageInboxDto, MessageUpdateInboxByIdDto, MessageUpsertInboxHandler } from '@api/message/inbox';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inbox/upsert')
@Auth('message.inbox.upsert')
export class MessageUpsertInboxController
{
    constructor(
        private readonly handler: MessageUpsertInboxHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert inbox' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: MessageInboxDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body() payload: MessageUpdateInboxByIdDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            account,
            payload,
            timezone,
            auditing,
        );
    }
}
