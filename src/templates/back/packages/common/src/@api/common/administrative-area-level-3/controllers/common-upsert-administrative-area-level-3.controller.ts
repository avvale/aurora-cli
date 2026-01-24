/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAdministrativeAreaLevel3Dto,
  CommonUpdateAdministrativeAreaLevel3ByIdDto,
  CommonUpsertAdministrativeAreaLevel3Handler,
} from '@api/common/administrative-area-level-3';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3/upsert')
@Auth('common.administrativeAreaLevel3.upsert')
export class CommonUpsertAdministrativeAreaLevel3Controller {
  constructor(
    private readonly handler: CommonUpsertAdministrativeAreaLevel3Handler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Upsert administrative-area-level-3' })
  @ApiCreatedResponse({
    description: 'The record has been successfully upserted.',
    type: CommonAdministrativeAreaLevel3Dto,
  })
  async main(
    @Body() payload: CommonUpdateAdministrativeAreaLevel3ByIdDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
