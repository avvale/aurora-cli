/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamTenantDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteTenantByIdHandler } from '../handlers/iam-delete-tenant-by-id.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/delete')
@Auth('iam.tenant.delete')
export class IamDeleteTenantByIdController
{
    constructor(
        private readonly handler: IamDeleteTenantByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete tenant by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: IamTenantDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}