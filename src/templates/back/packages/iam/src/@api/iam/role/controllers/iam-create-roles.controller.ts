/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamRoleDto, IamCreateRoleDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateRolesHandler } from '../handlers/iam-create-roles.handler';

@ApiTags('[iam] role')
@Controller('iam/roles/create')
@Permissions('iam.role.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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