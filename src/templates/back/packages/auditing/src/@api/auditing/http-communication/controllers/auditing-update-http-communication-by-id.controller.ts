/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationByIdDto, AuditingUpdateHttpCommunicationByIdHandler } from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
