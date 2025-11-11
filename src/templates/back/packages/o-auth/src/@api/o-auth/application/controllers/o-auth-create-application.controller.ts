/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthApplicationDto,
    OAuthCreateApplicationDto,
    OAuthCreateApplicationHandler,
} from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/create')
@Auth('oAuth.application.create')
export class OAuthCreateApplicationController {
    constructor(private readonly handler: OAuthCreateApplicationHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create application' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: OAuthApplicationDto,
    })
    async main(
        @Body() payload: OAuthCreateApplicationDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
