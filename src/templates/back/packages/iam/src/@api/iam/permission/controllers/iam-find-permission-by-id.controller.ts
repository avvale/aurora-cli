/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamFindPermissionByIdHandler, IamPermissionDto } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
