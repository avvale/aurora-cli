/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    AuditingDeleteHttpCommunicationByIdHandler,
    AuditingHttpCommunicationDto,
} from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/delete')
@Auth('auditing.httpCommunication.delete')
export class AuditingDeleteHttpCommunicationByIdController {
    constructor(
        private readonly handler: AuditingDeleteHttpCommunicationByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete http-communication by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: AuditingHttpCommunicationDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
