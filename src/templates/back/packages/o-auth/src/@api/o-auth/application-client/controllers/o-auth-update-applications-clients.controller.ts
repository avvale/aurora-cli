/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthApplicationClientDto, OAuthUpdateApplicationsClientsDto, OAuthUpdateApplicationsClientsHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application-client')
@Controller('o-auth/applications-clients/update')
@Auth('oAuth.applicationClient.update')
export class OAuthUpdateApplicationsClientsController
{
    constructor(
        private readonly handler: OAuthUpdateApplicationsClientsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update applications-clients' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthApplicationClientDto })
    async main(
        @Body() payload: OAuthUpdateApplicationsClientsDto,
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
