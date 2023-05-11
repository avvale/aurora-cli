/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamPermissionDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindPermissionByIdHandler } from '../handlers/iam-find-permission-by-id.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/find')
@Auth('iam.permission.get')
export class IamFindPermissionByIdController
{
    constructor(
        private readonly handler: IamFindPermissionByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find permission by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: IamPermissionDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}