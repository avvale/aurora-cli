/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthApplicationDto,
    OAuthFindApplicationHandler,
} from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/find')
@Auth('oAuth.application.get')
export class OAuthFindApplicationController {
    constructor(private readonly handler: OAuthFindApplicationHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application according to query' })
    @ApiOkResponse({
        description: 'The record has been successfully created.',
        type: OAuthApplicationDto,
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
