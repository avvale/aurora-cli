/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonCreateResourceDto,
  CommonCreateResourcesHandler,
  CommonResourceDto,
} from '@api/common/resource';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] resource')
@Controller('common/resources/create')
@Auth('common.resource.create')
export class CommonCreateResourcesController {
  constructor(private readonly handler: CommonCreateResourcesHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create resources in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [CommonResourceDto],
  })
  @ApiBody({ type: [CommonCreateResourceDto] })
  async main(
    @Body() payload: CommonCreateResourceDto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
