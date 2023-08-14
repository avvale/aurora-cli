/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamCreatePermissionDto, IamCreatePermissionHandler, IamPermissionDto } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
