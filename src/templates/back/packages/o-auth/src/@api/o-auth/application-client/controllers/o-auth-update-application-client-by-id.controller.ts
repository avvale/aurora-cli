/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthApplicationClientDto,
    OAuthUpdateApplicationClientByIdDto,
    OAuthUpdateApplicationClientByIdHandler,
} from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application-client')
@Controller('o-auth/application-client/update')
@Auth('oAuth.applicationClient.update')
export class OAuthUpdateApplicationClientByIdController {
    constructor(
        private readonly handler: OAuthUpdateApplicationClientByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application-client by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: OAuthApplicationClientDto,
    })
    async main(
        @Body() payload: OAuthUpdateApplicationClientByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
