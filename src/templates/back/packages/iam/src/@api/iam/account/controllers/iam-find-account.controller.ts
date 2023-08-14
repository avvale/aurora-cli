/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountDto, IamFindAccountHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] account')
@Controller('iam/account/find')
@Auth('iam.account.get')
export class IamFindAccountController
{
    constructor(
        private readonly handler: IamFindAccountHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find account according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamAccountDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
