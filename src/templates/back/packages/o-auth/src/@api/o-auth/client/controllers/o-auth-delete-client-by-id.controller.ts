/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthClientDto, OAuthDeleteClientByIdHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/delete')
@Auth('oAuth.client.delete')
export class OAuthDeleteClientByIdController
{
    constructor(
        private readonly handler: OAuthDeleteClientByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete client by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: OAuthClientDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}
