/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Permissions, Timezone, AuthorizationGuard, AuthenticationGuard } from '@aurora-ts/core';
import { AuditingHttpCommunicationDto } from '../dto';

// @app
import { AuditingDeleteHttpCommunicationByIdHandler } from '../handlers/auditing-delete-http-communication-by-id.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/delete')
@Permissions('auditing.httpCommunication.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingDeleteHttpCommunicationByIdController
{
    constructor(
        private readonly handler: AuditingDeleteHttpCommunicationByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete http-communication by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AuditingHttpCommunicationDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
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