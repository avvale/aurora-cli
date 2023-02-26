/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { OAuthApplicationDto, OAuthUpdateApplicationByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpsertApplicationHandler } from '../handlers/o-auth-upsert-application.handler';

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