/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuthenticationJwtGuard } from '@api/o-auth/shared';
import { MessageInboxDto } from '../dto';
import { MessagePaginateCustomerMessagesInboxHandler } from '../handlers/message-paginate-customer-messages-inbox.handler';
import { IamAccountResponse } from '@app/iam/account';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] inbox')
@Controller('message/inbox/paginate-customer-messages')
@UseGuards(AuthenticationJwtGuard)
export class MessagePaginateCustomerMessagesInboxController
{
    constructor(
        private readonly handler: MessagePaginateCustomerMessagesInboxHandler,
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