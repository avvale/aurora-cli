/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { IamTenantDto, IamCreateTenantDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateTenantHandler } from '../handlers/iam-create-tenant.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/create')
@Auth('iam.tenant.create')
export class IamCreateTenantController
{
    constructor(
        private readonly handler: IamCreateTenantHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tenant' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamTenantDto })
    async main(
        @Body() payload: IamCreateTenantDto,
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