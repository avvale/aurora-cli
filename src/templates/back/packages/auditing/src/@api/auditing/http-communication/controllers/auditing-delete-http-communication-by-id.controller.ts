/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { AuditingHttpCommunicationDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingDeleteHttpCommunicationByIdHandler } from '../handlers/auditing-delete-http-communication-by-id.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/delete')
@Auth('auditing.httpCommunication.delete')
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