/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthApplicationClientDto, OAuthUpdateApplicationClientByIdDto, OAuthUpsertApplicationClientHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application-client')
@Controller('o-auth/application-client/upsert')
@Auth('oAuth.applicationClient.upsert')
export class OAuthUpsertApplicationClientController
{
    constructor(
        private readonly handler: OAuthUpsertApplicationClientHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application-client' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: OAuthApplicationClientDto })
    async main(
        @Body() payload: OAuthUpdateApplicationClientByIdDto,
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
