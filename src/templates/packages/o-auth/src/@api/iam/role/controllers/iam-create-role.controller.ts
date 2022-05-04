/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamRoleDto, IamCreateRoleDto } from '../dto';

// @apps
import { IamCreateRoleHandler } from '../handlers/iam-create-role.handler';

@ApiTags('[iam] role')
@Controller('iam/role/create')
export class IamCreateRoleController
{
    constructor(
        private readonly handler: IamCreateRoleHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create role' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamRoleDto })
    async main(
        @Body() payload: IamCreateRoleDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}