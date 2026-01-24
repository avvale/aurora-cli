/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonResourceDto,
  CommonUpdateResourceByIdDto,
  CommonUpsertResourceHandler,
} from '@api/common/resource';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] resource')
@Controller('common/resource/upsert')
@Auth('common.resource.upsert')
export class CommonUpsertResourceController {
  constructor(private readonly handler: CommonUpsertResourceHandler) {}

  @Post()
  @ApiOperation({ summary: 'Upsert resource' })
  @ApiCreatedResponse({
    description: 'The record has been successfully upserted.',
    type: CommonResourceDto,
  })
  async main(
    @Body() payload: CommonUpdateResourceByIdDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
