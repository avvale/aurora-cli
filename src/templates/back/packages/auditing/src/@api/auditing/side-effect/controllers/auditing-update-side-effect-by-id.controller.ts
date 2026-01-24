/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  AuditingSideEffectDto,
  AuditingUpdateSideEffectByIdDto,
  AuditingUpdateSideEffectByIdHandler,
} from '@api/auditing/side-effect';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effect/update')
@Auth('auditing.sideEffect.update')
export class AuditingUpdateSideEffectByIdController {
  constructor(private readonly handler: AuditingUpdateSideEffectByIdHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update side-effect by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: AuditingSideEffectDto,
  })
  async main(
    @Body() payload: AuditingUpdateSideEffectByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(payload, constraint, timezone);
  }
}
