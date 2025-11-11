/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamFindPermissionHandler,
    IamPermissionDto,
} from '@api/iam/permission';
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

@ApiTags('[iam] permission')
@Controller('iam/permission/find')
@Auth('iam.permission.get')
export class IamFindPermissionController {
    constructor(private readonly handler: IamFindPermissionHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find permission according to query' })
    @ApiOkResponse({
        description: 'The record has been successfully created.',
        type: IamPermissionDto,
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
