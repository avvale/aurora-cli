/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  AuditingCreateHttpCommunicationDto,
  AuditingCreateHttpCommunicationHandler,
  AuditingHttpCommunicationDto,
} from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/create')
@Auth('auditing.httpCommunication.create')
export class AuditingCreateHttpCommunicationController {
  constructor(
    private readonly handler: AuditingCreateHttpCommunicationHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create http-communication' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: AuditingHttpCommunicationDto,
  })
  async main(
    @Body() payload: AuditingCreateHttpCommunicationDto,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(payload, timezone);
  }
}
