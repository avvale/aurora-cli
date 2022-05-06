/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamAccountDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamDeleteAccountsHandler } from '../handlers/iam-delete-accounts.handler';

@ApiTags('[iam] account')
@Controller('iam/accounts/delete')
@Permissions('iam.account.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
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
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}