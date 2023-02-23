/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthClientDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthDeleteClientsHandler } from '../handlers/o-auth-delete-clients.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/delete')
@Permissions('oAuth.client.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthDeleteClientsController
{
    constructor(
        private readonly handler: OAuthDeleteClientsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete clients in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [OAuthClientDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}