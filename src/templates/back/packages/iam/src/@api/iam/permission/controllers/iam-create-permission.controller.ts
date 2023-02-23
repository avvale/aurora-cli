/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamPermissionDto, IamCreatePermissionDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreatePermissionHandler } from '../handlers/iam-create-permission.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/create')
@Permissions('iam.permission.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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