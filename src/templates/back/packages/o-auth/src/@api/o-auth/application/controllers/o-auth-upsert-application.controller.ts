/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthApplicationDto, OAuthUpdateApplicationByIdDto, OAuthUpsertApplicationHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/upsert')
@Auth('oAuth.application.upsert')
export class OAuthUpsertApplicationController
{
    constructor(
        private readonly handler: OAuthUpsertApplicationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: OAuthApplicationDto })
    async main(
        @Body() payload: OAuthUpdateApplicationByIdDto,
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
