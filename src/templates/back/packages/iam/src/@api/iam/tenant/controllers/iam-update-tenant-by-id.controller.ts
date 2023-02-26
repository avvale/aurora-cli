/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamTenantDto, IamUpdateTenantByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateTenantByIdHandler } from '../handlers/iam-update-tenant-by-id.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/update')
@Auth('iam.tenant.update')
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
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}