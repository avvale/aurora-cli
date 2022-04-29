/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamPermissionDto, IamUpdatePermissionDto } from '../dto';

// @apps
import { IamUpdatePermissionHandler } from '../handlers/iam-update-permission.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/update')
export class IamUpdatePermissionController
{
    constructor(
        private readonly handler: IamUpdatePermissionHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update permission' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamPermissionDto})
    async main(
        @Body() payload: IamUpdatePermissionDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}