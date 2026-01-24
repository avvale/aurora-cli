/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  AuditingFindHttpCommunicationHandler,
  AuditingHttpCommunicationDto,
} from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communication/find')
@Auth('auditing.httpCommunication.get')
export class AuditingFindHttpCommunicationController {
  constructor(private readonly handler: AuditingFindHttpCommunicationHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find http-communication according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: AuditingHttpCommunicationDto,
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
