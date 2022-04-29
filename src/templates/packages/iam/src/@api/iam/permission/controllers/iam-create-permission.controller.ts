/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamPermissionDto, IamCreatePermissionDto } from '../dto';

// @apps
import { IamCreatePermissionHandler } from '../handlers/iam-create-permission.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/create')
export class IamCreatePermissionController
{
    constructor(
        private readonly handler: IamCreatePermissionHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permission' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamPermissionDto })
    async main(
        @Body() payload: IamCreatePermissionDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}