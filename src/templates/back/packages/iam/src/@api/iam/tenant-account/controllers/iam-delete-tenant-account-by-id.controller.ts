/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamDeleteTenantAccountByIdHandler, IamTenantAccountDto } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant-account')
@Controller('iam/tenant-account/delete')
@Auth('iam.tenantAccount.delete')
export class IamDeleteTenantAccountByIdController
{
    constructor(
        private readonly handler: IamDeleteTenantAccountByIdHandler,
    ) {}

    @Delete(':tenantId/:accountId')
    @ApiOperation({ summary: 'Delete tenant-account by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: IamTenantAccountDto })
    async main(
        @Param('tenantId') tenantId: string,
        @Param('accountId') accountId: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            tenantId,
            accountId,
            constraint,
            timezone,
            auditing,
        );
    }
}
