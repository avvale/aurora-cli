/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    OAuthApplicationDto,
    OAuthDeleteApplicationByIdHandler,
} from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/delete')
@Auth('oAuth.application.delete')
export class OAuthDeleteApplicationByIdController {
    constructor(private readonly handler: OAuthDeleteApplicationByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: OAuthApplicationDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
