/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAdministrativeAreaLevel3Dto,
  CommonCreateAdministrativeAreaLevel3Dto,
  CommonCreateAdministrativeAreasLevel3Handler,
} from '@api/common/administrative-area-level-3';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-areas-level-3/create')
@Auth('common.administrativeAreaLevel3.create')
export class CommonCreateAdministrativeAreasLevel3Controller {
  constructor(
    private readonly handler: CommonCreateAdministrativeAreasLevel3Handler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create administrative-areas-level-3 in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [CommonAdministrativeAreaLevel3Dto],
  })
  @ApiBody({ type: [CommonCreateAdministrativeAreaLevel3Dto] })
  async main(
    @Body() payload: CommonCreateAdministrativeAreaLevel3Dto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
