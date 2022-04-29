/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamRoleDto, IamCreateRoleDto } from '../dto';

// @apps
import { IamCreateRolesHandler } from '../handlers/iam-create-roles.handler';

@ApiTags('[iam] role')
@Controller('iam/roles/create')
export class IamCreateRolesController
{
    constructor(
        private readonly handler: IamCreateRolesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create roles in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [IamRoleDto]})
    @ApiBody({ type: [IamCreateRoleDto]})
    async main(
        @Body() payload: IamCreateRoleDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}