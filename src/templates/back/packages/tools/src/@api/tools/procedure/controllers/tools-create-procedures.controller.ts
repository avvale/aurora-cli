/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ToolsCreateProcedureDto,
  ToolsCreateProceduresHandler,
  ToolsProcedureDto,
} from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] procedure')
@Controller('tools/procedures/create')
@Auth('tools.procedure.create')
export class ToolsCreateProceduresController {
  constructor(private readonly handler: ToolsCreateProceduresHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create procedures in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [ToolsProcedureDto],
  })
  @ApiBody({ type: [ToolsCreateProcedureDto] })
  async main(
    @Body() payload: ToolsCreateProcedureDto[],
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(payload, timezone);
  }
}
