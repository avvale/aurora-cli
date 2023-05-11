/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamAccountDto, IamUpdateAccountsDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateAccountsHandler } from '../handlers/iam-update-accounts.handler';

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