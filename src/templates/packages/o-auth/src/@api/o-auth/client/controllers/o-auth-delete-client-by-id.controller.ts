/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthClientDto } from '../dto';

// @apps
import { OAuthDeleteClientByIdHandler } from '../handlers/o-auth-delete-client-by-id.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/delete')
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
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}