/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2Dto,
  CommonCreateAdministrativeAreaLevel2Dto,
  CommonCreateAdministrativeAreaLevel2Handler,
} from '@api/common/administrative-area-level-2';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2/create')
@Auth('common.administrativeAreaLevel2.create')
export class CommonCreateAdministrativeAreaLevel2Controller {
  constructor(
    private readonly handler: CommonCreateAdministrativeAreaLevel2Handler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create administrative-area-level-2' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CommonAdministrativeAreaLevel2Dto,
  })
  async main(
    @Body() payload: CommonCreateAdministrativeAreaLevel2Dto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
