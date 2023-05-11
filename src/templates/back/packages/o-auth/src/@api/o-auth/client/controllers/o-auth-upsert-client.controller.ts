/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { OAuthClientDto, OAuthUpdateClientByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpsertClientHandler } from '../handlers/o-auth-upsert-client.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/upsert')
@Auth('oAuth.client.upsert')
export class OAuthUpsertClientController
{
    constructor(
        private readonly handler: OAuthUpsertClientHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert client' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: OAuthClientDto })
    async main(
        @Body() payload: OAuthUpdateClientByIdDto,
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