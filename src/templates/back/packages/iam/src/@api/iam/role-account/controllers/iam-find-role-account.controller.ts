/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamFindRoleAccountHandler,
    IamRoleAccountDto,
} from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] role-account')
@Controller('iam/role-account/find')
@Auth('iam.roleAccount.get')
export class IamFindRoleAccountController {
    constructor(private readonly handler: IamFindRoleAccountHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find role-account according to query' })
    @ApiOkResponse({
        description: 'The record has been successfully created.',
        type: IamRoleAccountDto,
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
