/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthApplicationDto,
    OAuthUpdateApplicationByIdDto,
    OAuthUpdateApplicationByIdHandler,
} from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/update')
@Auth('oAuth.application.update')
export class OAuthUpdateApplicationByIdController {
    constructor(private readonly handler: OAuthUpdateApplicationByIdHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update application by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: OAuthApplicationDto,
    })
    async main(
        @Body() payload: OAuthUpdateApplicationByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
