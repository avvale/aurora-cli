/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { IamPermissionDto, IamCreatePermissionDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreatePermissionHandler } from '../handlers/iam-create-permission.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/create')
@Auth('iam.permission.create')
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
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}