/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamAccountDto } from '../dto';

// @apps
import { IamFindAccountByIdHandler } from '../handlers/iam-find-account-by-id.handler';

@ApiTags('[iam] account')
@Controller('iam/account/find')
export class IamFindAccountByIdController
{
    constructor(
        private readonly handler: IamFindAccountByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find account by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamAccountDto })
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