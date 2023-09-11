/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthApplicationClientDto, OAuthFindApplicationClientHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application-client')
@Controller('o-auth/application-client/find')
@Auth('oAuth.applicationClient.get')
export class OAuthFindApplicationClientController
{
    constructor(
        private readonly handler: OAuthFindApplicationClientHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application-client according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: OAuthApplicationClientDto })
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
