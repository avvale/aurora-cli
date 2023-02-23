/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamTenantDto } from '../dto';

// @app
import { IamFindTenantByIdHandler } from '../handlers/iam-find-tenant-by-id.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/find')
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindTenantByIdController
{
    constructor(
        private readonly handler: IamFindTenantByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find tenant by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: IamTenantDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}