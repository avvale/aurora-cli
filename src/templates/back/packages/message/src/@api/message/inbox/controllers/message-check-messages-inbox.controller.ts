// ignored file
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuthenticationJwtGuard } from '@api/o-auth/shared';
import { IamAccountResponse } from '@app/iam/account';
import { Auditing, AuditingMeta, CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageCheckMessagesInboxHandler } from '../handlers/message-check-messages-inbox.handler';

@ApiTags('[message] inbox')
@Controller('message/inbox/check-messages')
@UseGuards(AuthenticationJwtGuard)
export class MessageCheckMessagesInboxController
{
    constructor(
        private readonly handler: MessageCheckMessagesInboxHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            account,
            timezone,
            auditing,
        );
    }
}