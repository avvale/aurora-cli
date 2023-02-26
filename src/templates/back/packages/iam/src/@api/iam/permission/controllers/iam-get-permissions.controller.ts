/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { IamPermissionDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetPermissionsHandler } from '../handlers/iam-get-permissions.handler';

@ApiTags('[iam] permission')
@Controller('iam/permissions/get')
@Auth('iam.permission.get')
export class IamGetPermissionsController
{
    constructor(
        private readonly handler: IamGetPermissionsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get permissions according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [IamPermissionDto]})
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