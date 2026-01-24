/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsKeyValueDto,
  ToolsUpdateKeyValueByIdDto,
  ToolsUpdateKeyValueByIdHandler,
} from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] key-value')
@Controller('tools/key-value/update')
@Auth('tools.keyValue.update')
export class ToolsUpdateKeyValueByIdController {
  constructor(private readonly handler: ToolsUpdateKeyValueByIdHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update key-value by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: ToolsKeyValueDto,
  })
  async main(
    @Body() payload: ToolsUpdateKeyValueByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
