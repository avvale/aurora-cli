/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthScopeDto } from '../dto';

// @apps
import { OAuthFindScopeByIdHandler } from '../handlers/o-auth-find-scope-by-id.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/find')
export class OAuthFindScopeByIdController
{
    constructor(
        private readonly handler: OAuthFindScopeByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find scope by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: OAuthScopeDto })
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