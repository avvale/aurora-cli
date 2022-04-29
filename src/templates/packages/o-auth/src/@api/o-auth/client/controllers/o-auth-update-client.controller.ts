/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthClientDto, OAuthUpdateClientDto } from '../dto';

// @apps
import { OAuthUpdateClientHandler } from '../handlers/o-auth-update-client.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/update')
export class OAuthUpdateClientController
{
    constructor(
        private readonly handler: OAuthUpdateClientHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update client' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthClientDto})
    async main(
        @Body() payload: OAuthUpdateClientDto,
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