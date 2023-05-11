/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamPermissionDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindPermissionHandler } from '../handlers/iam-find-permission.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/find')
@Auth('iam.permission.get')
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