/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsProcedureDto,
  ToolsUpdateProcedureByIdDto,
  ToolsUpdateProcedureByIdHandler,
} from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] procedure')
@Controller('tools/procedure/update')
@Auth('tools.procedure.update')
export class ToolsUpdateProcedureByIdController {
  constructor(private readonly handler: ToolsUpdateProcedureByIdHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update procedure by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: ToolsProcedureDto,
  })
  async main(
    @Body() payload: ToolsUpdateProcedureByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(payload, constraint, timezone);
  }
}
