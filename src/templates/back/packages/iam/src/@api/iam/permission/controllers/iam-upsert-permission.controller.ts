/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { IamPermissionDto, IamUpdatePermissionByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertPermissionHandler } from '../handlers/iam-upsert-permission.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/upsert')
@Auth('iam.permission.upsert')
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