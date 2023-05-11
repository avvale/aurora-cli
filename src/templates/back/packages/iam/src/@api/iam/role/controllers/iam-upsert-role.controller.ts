/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { IamRoleDto, IamUpdateRoleByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertRoleHandler } from '../handlers/iam-upsert-role.handler';

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