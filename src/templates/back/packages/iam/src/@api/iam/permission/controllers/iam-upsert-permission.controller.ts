/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamPermissionDto, IamUpdatePermissionByIdDto, IamUpsertPermissionHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
