/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantConstraint } from '@api/iam/shared';
import { MessagePaginateMessagesHandler } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[message] message')
@Controller('message/messages/paginate')
@Auth('message.message.get')
export class MessagePaginateMessagesController
{
    constructor(
        private readonly handler: MessagePaginateMessagesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate messages' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    @TenantConstraint()
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
