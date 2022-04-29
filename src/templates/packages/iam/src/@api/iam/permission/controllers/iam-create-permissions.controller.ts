/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamPermissionDto, IamCreatePermissionDto } from '../dto';

// @apps
import { IamCreatePermissionsHandler } from '../handlers/iam-create-permissions.handler';

@ApiTags('[iam] permission')
@Controller('iam/permissions/create')
export class IamCreatePermissionsController
{
    constructor(
        private readonly handler: IamCreatePermissionsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permissions in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [IamPermissionDto]})
    @ApiBody({ type: [IamCreatePermissionDto]})
    async main(
        @Body() payload: IamCreatePermissionDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}