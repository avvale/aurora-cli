/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from 'aurora-ts-core';
import { IamTenantDto, IamUpdateTenantByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateTenantByIdHandler } from '../handlers/iam-update-tenant-by-id.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/update')
@Permissions('iam.tenant.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateTenantByIdController
{
    constructor(
        private readonly handler: IamUpdateTenantByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update tenant by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamTenantDto })
    async main(
        @Body() payload: IamUpdateTenantByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}