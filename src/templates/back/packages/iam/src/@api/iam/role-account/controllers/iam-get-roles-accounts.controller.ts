/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamGetRolesAccountsHandler, IamRoleAccountDto } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role-account')
@Controller('iam/roles-accounts/get')
@Auth('iam.roleAccount.get')
export class IamGetRolesAccountsController
{
    constructor(
        private readonly handler: IamGetRolesAccountsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get roles-accounts according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [IamRoleAccountDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
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
