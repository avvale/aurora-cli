/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamAccountDto, IamUpdateAccountsDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateAccountsHandler } from '../handlers/iam-update-accounts.handler';

@ApiTags('[iam] account')
@Controller('iam/accounts/update')
@Permissions('iam.account.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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