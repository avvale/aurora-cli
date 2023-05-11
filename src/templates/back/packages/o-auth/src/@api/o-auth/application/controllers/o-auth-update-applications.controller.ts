/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthApplicationDto, OAuthUpdateApplicationsDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateApplicationsHandler } from '../handlers/o-auth-update-applications.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/update')
@Auth('oAuth.application.update')
export class OAuthUpdateApplicationsController
{
    constructor(
        private readonly handler: OAuthUpdateApplicationsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update applications' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthApplicationDto })
    async main(
        @Body() payload: OAuthUpdateApplicationsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}