/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamFindTenantAccountByIdHandler, IamTenantAccountDto } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant-account')
@Controller('iam/tenant-account/find')
@Auth('iam.tenantAccount.get')
export class IamFindTenantAccountByIdController
{
    constructor(
        private readonly handler: IamFindTenantAccountByIdHandler,
    ) {}

    @Post(':tenantId/:accountId')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find tenant-account by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: IamTenantAccountDto })
    async main(
        @Param('tenantId') tenantId: string,
        @Param('accountId') accountId: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            tenantId,
            accountId,
            constraint,
            timezone,
        );
    }
}
