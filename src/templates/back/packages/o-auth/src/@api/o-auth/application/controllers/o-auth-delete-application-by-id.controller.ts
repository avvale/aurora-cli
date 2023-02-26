/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthApplicationDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteApplicationByIdHandler } from '../handlers/o-auth-delete-application-by-id.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/delete')
@Auth('oAuth.application.delete')
export class OAuthDeleteApplicationByIdController
{
    constructor(
        private readonly handler: OAuthDeleteApplicationByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: OAuthApplicationDto })
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