/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthClientDto, OAuthUpdateClientsDto, OAuthUpdateClientsHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/update')
@Auth('oAuth.client.update')
export class OAuthUpdateClientsController
{
    constructor(
        private readonly handler: OAuthUpdateClientsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update clients' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthClientDto })
    async main(
        @Body() payload: OAuthUpdateClientsDto,
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
