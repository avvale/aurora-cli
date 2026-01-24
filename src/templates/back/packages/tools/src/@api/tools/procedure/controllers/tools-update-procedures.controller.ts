/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsProcedureDto,
  ToolsUpdateProceduresDto,
  ToolsUpdateProceduresHandler,
} from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] procedure')
@Controller('tools/procedures/update')
@Auth('tools.procedure.update')
export class ToolsUpdateProceduresController {
  constructor(private readonly handler: ToolsUpdateProceduresHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update procedures' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: ToolsProcedureDto,
  })
  async main(
    @Body() payload: ToolsUpdateProceduresDto,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
    );
  }
}
