/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamRoleDto, IamUpdateRoleByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpsertRoleHandler } from '../handlers/iam-upsert-role.handler';

@ApiTags('[iam] role')
@Controller('iam/role/upsert')
@Permissions('iam.role.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpsertRoleController
{
    constructor(
        private readonly handler: IamUpsertRoleHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert role' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamRoleDto })
    async main(
        @Body() payload: IamUpdateRoleByIdDto,
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