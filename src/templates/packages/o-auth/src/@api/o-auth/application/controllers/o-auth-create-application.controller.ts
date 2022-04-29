/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { OAuthApplicationDto, OAuthCreateApplicationDto } from '../dto';

// @apps
import { OAuthCreateApplicationHandler } from '../handlers/o-auth-create-application.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/create')
export class OAuthCreateApplicationController
{
    constructor(
        private readonly handler: OAuthCreateApplicationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: OAuthApplicationDto })
    async main(
        @Body() payload: OAuthCreateApplicationDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}