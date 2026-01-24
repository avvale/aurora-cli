/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  AuditingFindSideEffectByIdHandler,
  AuditingSideEffectDto,
} from '@api/auditing/side-effect';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/find')
@Auth('auditing.sideEffect.get')
export class AuditingFindSideEffectByIdController {
  constructor(private readonly handler: AuditingFindSideEffectByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find side-effect by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: AuditingSideEffectDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
