/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamAccountDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindAccountByIdHandler } from '../handlers/iam-find-account-by-id.handler';

@ApiTags('[iam] account')
@Controller('iam/account/find')
@Auth('iam.account.get')
export class IamFindAccountByIdController
{
    constructor(
        private readonly handler: IamFindAccountByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find account by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: IamAccountDto })
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