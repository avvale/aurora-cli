/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthApplicationDto, OAuthUpdateApplicationsDto, OAuthUpdateApplicationsHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
