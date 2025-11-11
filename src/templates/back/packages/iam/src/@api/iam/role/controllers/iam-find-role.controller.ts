/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamFindRoleHandler, IamRoleDto } from '@api/iam/role';
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

@ApiTags('[iam] role')
@Controller('iam/role/find')
@Auth('iam.role.get')
export class IamFindRoleController {
    constructor(private readonly handler: IamFindRoleHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find role according to query' })
    @ApiOkResponse({
        description: 'The record has been successfully created.',
        type: IamRoleDto,
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
