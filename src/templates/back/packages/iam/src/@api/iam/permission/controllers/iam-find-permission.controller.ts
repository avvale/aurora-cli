/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamPermissionDto } from '../dto';

// @app
import { IamFindPermissionHandler } from '../handlers/iam-find-permission.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/find')
@Permissions('iam.permission.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindPermissionController
{
    constructor(
        private readonly handler: IamFindPermissionHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find permission according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamPermissionDto })
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