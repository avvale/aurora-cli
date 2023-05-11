/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { OAuthCreateCredentialsDto } from '../dto';

// @app
import { OAuthCreateCredentialsHandler } from '../handlers/o-auth-create-credentials.handler';

@ApiTags('[o-auth] credential')
@Controller('o-auth/credentials')
export class OAuthCreateCredentialsController
{
    constructor(
        private readonly handler: OAuthCreateCredentialsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create credential' })
    @ApiCreatedResponse({ description: 'The credential obtained after login.', type: OAuthCreateCredentialsDto })
    async main(
        @Body() payload: OAuthCreateCredentialsDto,
        @Headers('Authorization') authorization: string,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            authorization,
            timezone,
            auditing,
        );
    }
}