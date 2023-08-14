/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamRoleDto, IamUpdateRoleByIdDto, IamUpsertRoleHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role')
@Controller('iam/role/upsert')
@Auth('iam.role.upsert')
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
