/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { IamPermissionDto, IamCreatePermissionDto } from '../dto';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreatePermissionsHandler } from '../handlers/iam-create-permissions.handler';

@ApiTags('[iam] permission')
@Controller('iam/permissions/create')
@Permissions('iam.permission.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
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