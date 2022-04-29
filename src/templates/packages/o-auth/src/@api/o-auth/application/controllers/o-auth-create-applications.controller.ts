/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { OAuthApplicationDto, OAuthCreateApplicationDto } from '../dto';

// @apps
import { OAuthCreateApplicationsHandler } from '../handlers/o-auth-create-applications.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/create')
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
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}