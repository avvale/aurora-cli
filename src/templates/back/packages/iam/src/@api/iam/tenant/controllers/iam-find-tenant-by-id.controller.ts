/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamTenantDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindTenantByIdHandler } from '../handlers/iam-find-tenant-by-id.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/find')
@Auth('iam.tenant.get')
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