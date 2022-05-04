/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamRoleDto, IamUpdateRoleDto } from '../dto';

// @apps
import { IamUpdateRoleHandler } from '../handlers/iam-update-role.handler';

@ApiTags('[iam] role')
@Controller('iam/role/update')
export class IamUpdateRoleController
{
    constructor(
        private readonly handler: IamUpdateRoleHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update role' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamRoleDto})
    async main(
        @Body() payload: IamUpdateRoleDto,
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