/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    AuditingFindHttpCommunicationByIdHandler,
    AuditingHttpCommunicationDto,
} from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/find')
@Auth('auditing.httpCommunication.get')
export class AuditingFindHttpCommunicationByIdController {
    constructor(
        private readonly handler: AuditingFindHttpCommunicationByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find http-communication by id' })
    @ApiOkResponse({
        description: 'The record has been successfully requested.',
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
