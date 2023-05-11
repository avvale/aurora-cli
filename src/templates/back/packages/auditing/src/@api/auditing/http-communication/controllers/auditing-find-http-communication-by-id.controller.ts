/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { AuditingHttpCommunicationDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingFindHttpCommunicationByIdHandler } from '../handlers/auditing-find-http-communication-by-id.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/find')
@Auth('auditing.httpCommunication.get')
export class AuditingFindHttpCommunicationByIdController
{
    constructor(
        private readonly handler: AuditingFindHttpCommunicationByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find http-communication by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AuditingHttpCommunicationDto })
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