/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { IamRoleDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindRoleByIdHandler } from '../handlers/iam-find-role-by-id.handler';

@ApiTags('[iam] role')
@Controller('iam/role/find')
@Auth('iam.role.get')
export class IamFindRoleByIdController
{
    constructor(
        private readonly handler: IamFindRoleByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find role by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: IamRoleDto })
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