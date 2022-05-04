/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamTenantDto } from '../dto';

// @apps
import { IamFindTenantByIdHandler } from '../handlers/iam-find-tenant-by-id.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/find')
export class IamFindTenantByIdController
{
    constructor(
        private readonly handler: IamFindTenantByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find tenant by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamTenantDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
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