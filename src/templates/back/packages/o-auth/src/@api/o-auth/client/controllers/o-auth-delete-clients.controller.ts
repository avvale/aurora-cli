/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthClientDto, OAuthDeleteClientsHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/delete')
@Auth('oAuth.client.delete')
export class OAuthDeleteClientsController {
    constructor(private readonly handler: OAuthDeleteClientsHandler) {}

    @Delete()
    @ApiOperation({ summary: 'Delete clients in batch according to query' })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [OAuthClientDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
