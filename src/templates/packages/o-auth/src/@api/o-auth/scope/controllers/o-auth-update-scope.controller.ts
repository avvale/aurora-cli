/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthScopeDto, OAuthUpdateScopeDto } from '../dto';

// @apps
import { OAuthUpdateScopeHandler } from '../handlers/o-auth-update-scope.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/update')
export class OAuthUpdateScopeController
{
    constructor(
        private readonly handler: OAuthUpdateScopeHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update scope' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthScopeDto})
    async main(
        @Body() payload: OAuthUpdateScopeDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}