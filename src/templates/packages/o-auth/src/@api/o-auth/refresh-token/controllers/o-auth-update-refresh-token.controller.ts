/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthRefreshTokenDto, OAuthUpdateRefreshTokenDto } from '../dto';

// @apps
import { OAuthUpdateRefreshTokenHandler } from '../handlers/o-auth-update-refresh-token.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/update')
export class OAuthUpdateRefreshTokenController
{
    constructor(
        private readonly handler: OAuthUpdateRefreshTokenHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update refresh-token' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthRefreshTokenDto})
    async main(
        @Body() payload: OAuthUpdateRefreshTokenDto,
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