/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamRoleDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetRolesHandler } from '../handlers/iam-get-roles.handler';

@ApiTags('[iam] role')
@Controller('iam/roles/get')
@Auth('iam.role.get')
export class IamGetRolesController
{
    constructor(
        private readonly handler: IamGetRolesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get roles according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [IamRoleDto]})
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