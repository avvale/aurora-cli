/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsCreateKeyValueDto,
  ToolsCreateKeyValuesHandler,
  ToolsKeyValueDto,
} from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] key-value')
@Controller('tools/key-values/create')
@Auth('tools.keyValue.create')
export class ToolsCreateKeyValuesController {
  constructor(private readonly handler: ToolsCreateKeyValuesHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create key-values in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [ToolsKeyValueDto],
  })
  @ApiBody({ type: [ToolsCreateKeyValueDto] })
  async main(
    @Body() payload: ToolsCreateKeyValueDto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
