/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingUpdateHttpCommunicationByIdHandler } from '../handlers/auditing-update-http-communication-by-id.handler';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/update')
@Auth('auditing.httpCommunication.update')
export class AuditingUpdateHttpCommunicationByIdController
{
    constructor(
        private readonly handler: AuditingUpdateHttpCommunicationByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update http-communication by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AuditingHttpCommunicationDto })
    async main(
        @Body() payload: AuditingUpdateHttpCommunicationByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}