/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamRoleDto } from '../dto';

// @app
import { IamFindRoleHandler } from '../handlers/iam-find-role.handler';

@ApiTags('[iam] role')
@Controller('iam/role/find')
@Permissions('iam.role.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindRoleController
{
    constructor(
        private readonly handler: IamFindRoleHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find role according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamRoleDto })
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