/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamRoleDto, IamCreateRoleDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateRoleHandler } from '../handlers/iam-create-role.handler';

@ApiTags('[iam] role')
@Controller('iam/role/create')
@Permissions('iam.role.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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