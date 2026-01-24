/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAdministrativeAreaLevel1Dto,
  CommonCreateAdministrativeAreaLevel1Dto,
  CommonCreateAdministrativeAreasLevel1Handler,
} from '@api/common/administrative-area-level-1';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-areas-level-1/create')
@Auth('common.administrativeAreaLevel1.create')
export class CommonCreateAdministrativeAreasLevel1Controller {
  constructor(
    private readonly handler: CommonCreateAdministrativeAreasLevel1Handler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create administrative-areas-level-1 in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [CommonAdministrativeAreaLevel1Dto],
  })
  @ApiBody({ type: [CommonCreateAdministrativeAreaLevel1Dto] })
  async main(
    @Body() payload: CommonCreateAdministrativeAreaLevel1Dto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
