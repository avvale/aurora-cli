/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthClientDto } from '../dto';

// @app
import { OAuthGetClientsHandler } from '../handlers/o-auth-get-clients.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/get')
@Permissions('oAuth.client.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthGetClientsController
{
    constructor(
        private readonly handler: OAuthGetClientsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get clients according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [OAuthClientDto]})
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