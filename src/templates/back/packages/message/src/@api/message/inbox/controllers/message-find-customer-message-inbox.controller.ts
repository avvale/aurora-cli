/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuthenticationJwtGuard } from '@api/o-auth/shared';
import { MessageInboxDto } from '../dto';
import { MessageFindCustomerMessageInboxHandler } from '../handlers/message-find-customer-message-inbox.handler';
import { IamAccountResponse } from '@app/iam/account';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inbox/find-customer-message')
@UseGuards(AuthenticationJwtGuard)
export class MessageFindCustomerMessageInboxController
{
    constructor(
        private readonly handler: MessageFindCustomerMessageInboxHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: [MessageInboxDto]})
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            account,
            queryStatement,
            constraint,
            timezone,
        );
    }
}