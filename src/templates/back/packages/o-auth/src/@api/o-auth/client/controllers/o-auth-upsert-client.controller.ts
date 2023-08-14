/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthClientDto, OAuthUpdateClientByIdDto, OAuthUpsertClientHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
