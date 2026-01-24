/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsDeleteProcedureByIdHandler,
  ToolsProcedureDto,
} from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[tools] procedure')
@Controller('tools/procedure/delete')
@Auth('tools.procedure.delete')
export class ToolsDeleteProcedureByIdController {
  constructor(private readonly handler: ToolsDeleteProcedureByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete procedure by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: ToolsProcedureDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
