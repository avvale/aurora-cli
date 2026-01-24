/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonLangDto,
  CommonUpdateLangByIdDto,
  CommonUpsertLangHandler,
} from '@api/common/lang';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] lang')
@Controller('common/lang/upsert')
@Auth('common.lang.upsert')
export class CommonUpsertLangController {
  constructor(private readonly handler: CommonUpsertLangHandler) {}

  @Post()
  @ApiOperation({ summary: 'Upsert lang' })
  @ApiCreatedResponse({
    description: 'The record has been successfully upserted.',
    type: CommonLangDto,
  })
  async main(
    @Body() payload: CommonUpdateLangByIdDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
