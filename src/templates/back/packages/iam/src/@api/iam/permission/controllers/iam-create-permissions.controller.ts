/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamPermissionDto, IamCreatePermissionDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreatePermissionsHandler } from '../handlers/iam-create-permissions.handler';

@ApiTags('[iam] permission')
@Controller('iam/permissions/create')
@Permissions('iam.permission.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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