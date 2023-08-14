/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountDto, IamUpdateAccountsDto, IamUpdateAccountsHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] account')
@Controller('iam/accounts/update')
@Auth('iam.account.update')
export class IamUpdateAccountsController
{
    constructor(
        private readonly handler: IamUpdateAccountsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update accounts' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamAccountDto })
    async main(
        @Body() payload: IamUpdateAccountsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
