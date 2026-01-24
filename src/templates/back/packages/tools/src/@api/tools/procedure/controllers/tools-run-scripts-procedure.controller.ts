/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToolsRunScriptsProcedureHandler } from '../handlers/tools-run-scripts-procedure.handler';

@ApiTags('[tools] procedure')
@Controller('tools/procedure/run-scripts')
@Auth('tools.procedure.update')
export class ToolsRunScriptsProcedureController {
  constructor(private readonly handler: ToolsRunScriptsProcedureHandler) {}

  @Post()
  @ApiOperation({ summary: 'Defines the operation of this controller' })
  @ApiCreatedResponse({
    description: 'Defines the action performed',
    type: Boolean,
  })
  async main(@Timezone() timezone?: string) {
    return await this.handler.main(timezone);
  }
}
