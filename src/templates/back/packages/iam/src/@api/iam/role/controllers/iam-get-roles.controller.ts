/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamGetRolesHandler, IamRoleDto } from '@api/iam/role';
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
@Controller('iam/roles/get')
@Auth('iam.role.get')
export class IamGetRolesController {
    constructor(private readonly handler: IamGetRolesHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get roles according to query' })
    @ApiOkResponse({
        description: 'The records has been found successfully.',
        type: [IamRoleDto],
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
