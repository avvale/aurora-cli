/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { OAuthApplicationDto, OAuthCreateApplicationDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateApplicationsHandler } from '../handlers/o-auth-create-applications.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/create')
@Auth('oAuth.application.create')
export class OAuthCreateApplicationsController
{
    constructor(
        private readonly handler: OAuthCreateApplicationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create applications in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [OAuthApplicationDto]})
    @ApiBody({ type: [OAuthCreateApplicationDto]})
    async main(
        @Body() payload: OAuthCreateApplicationDto[],
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