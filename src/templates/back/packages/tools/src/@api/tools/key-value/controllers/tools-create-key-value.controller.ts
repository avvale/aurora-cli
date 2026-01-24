/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsCreateKeyValueDto,
  ToolsCreateKeyValueHandler,
  ToolsKeyValueDto,
} from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] key-value')
@Controller('tools/key-value/create')
@Auth('tools.keyValue.create')
export class ToolsCreateKeyValueController {
  constructor(private readonly handler: ToolsCreateKeyValueHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create key-value' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ToolsKeyValueDto,
  })
  async main(
    @Body() payload: ToolsCreateKeyValueDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
