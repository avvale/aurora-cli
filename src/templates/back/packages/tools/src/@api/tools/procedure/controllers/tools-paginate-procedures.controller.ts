/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ToolsPaginateProceduresHandler } from '@api/tools/procedure';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[tools] procedure')
@Controller('tools/procedures/paginate')
@Auth('tools.procedure.get')
export class ToolsPaginateProceduresController {
  constructor(private readonly handler: ToolsPaginateProceduresHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate procedures' })
  @ApiOkResponse({
    description: 'The records has been paginated successfully.',
    type: Pagination,
  })
  @ApiQuery({ name: 'queryStatement', type: QueryStatement })
  @ApiQuery({ name: 'constraint', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
