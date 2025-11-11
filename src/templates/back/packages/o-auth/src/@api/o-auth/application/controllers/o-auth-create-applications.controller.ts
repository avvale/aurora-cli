/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthApplicationDto,
    OAuthCreateApplicationDto,
    OAuthCreateApplicationsHandler,
} from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/create')
@Auth('oAuth.application.create')
export class OAuthCreateApplicationsController {
    constructor(private readonly handler: OAuthCreateApplicationsHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create applications in batch' })
    @ApiCreatedResponse({
        description: 'The records has been created successfully.',
        type: [OAuthApplicationDto],
    })
    @ApiBody({ type: [OAuthCreateApplicationDto] })
    async main(
        @Body() payload: OAuthCreateApplicationDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
