/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthApplicationDto } from '../dto';

// @app
import { OAuthGetApplicationsHandler } from '../handlers/o-auth-get-applications.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/get')
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthGetApplicationsController
{
    constructor(
        private readonly handler: OAuthGetApplicationsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get applications according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [OAuthApplicationDto]})
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