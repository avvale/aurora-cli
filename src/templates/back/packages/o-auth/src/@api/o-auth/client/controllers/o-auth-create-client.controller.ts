/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { OAuthClientDto, OAuthCreateClientDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateClientHandler } from '../handlers/o-auth-create-client.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/create')
@Auth('oAuth.client.create')
export class OAuthCreateClientController
{
    constructor(
        private readonly handler: OAuthCreateClientHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create client' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: OAuthClientDto })
    async main(
        @Body() payload: OAuthCreateClientDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}