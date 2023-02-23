/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamAccountDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteAccountsHandler } from '../handlers/iam-delete-accounts.handler';

@ApiTags('[iam] account')
@Controller('iam/accounts/delete')
@Permissions('iam.account.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteAccountsController
{
    constructor(
        private readonly handler: IamDeleteAccountsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete accounts in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [IamAccountDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}