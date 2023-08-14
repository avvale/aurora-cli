/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthClientDto, OAuthUpdateClientByIdDto, OAuthUpdateClientByIdHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/update')
@Auth('oAuth.client.update')
export class OAuthUpdateClientByIdController
{
    constructor(
        private readonly handler: OAuthUpdateClientByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update client by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthClientDto })
    async main(
        @Body() payload: OAuthUpdateClientByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
