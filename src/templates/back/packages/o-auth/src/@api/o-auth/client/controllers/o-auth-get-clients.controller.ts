/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthClientDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthGetClientsHandler } from '../handlers/o-auth-get-clients.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/get')
@Auth('oAuth.client.get')
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