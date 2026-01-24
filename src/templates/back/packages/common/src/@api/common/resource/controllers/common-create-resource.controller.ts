/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonCreateResourceDto,
  CommonCreateResourceHandler,
  CommonResourceDto,
} from '@api/common/resource';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] resource')
@Controller('common/resource/create')
@Auth('common.resource.create')
export class CommonCreateResourceController {
  constructor(private readonly handler: CommonCreateResourceHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create resource' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CommonResourceDto,
  })
  async main(
    @Body() payload: CommonCreateResourceDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
