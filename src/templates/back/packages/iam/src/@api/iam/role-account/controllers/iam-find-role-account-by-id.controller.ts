/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamFindRoleAccountByIdHandler, IamRoleAccountDto } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role-account')
@Controller('iam/role-account/find')
@Auth('iam.roleAccount.get')
export class IamFindRoleAccountByIdController
{
    constructor(
        private readonly handler: IamFindRoleAccountByIdHandler,
    ) {}

    @Post(':roleId/:accountId')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find role-account by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: IamRoleAccountDto })
    async main(
        @Param('roleId') roleId: string,
        @Param('accountId') accountId: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            roleId,
            accountId,
            constraint,
            timezone,
        );
    }
}
