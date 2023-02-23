/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamPermissionDto, IamUpdatePermissionByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpsertPermissionHandler } from '../handlers/iam-upsert-permission.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/upsert')
@Permissions('iam.permission.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpsertPermissionController
{
    constructor(
        private readonly handler: IamUpsertPermissionHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert permission' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamPermissionDto })
    async main(
        @Body() payload: IamUpdatePermissionByIdDto,
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