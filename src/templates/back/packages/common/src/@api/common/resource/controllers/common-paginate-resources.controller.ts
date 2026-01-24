/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonPaginateResourcesHandler } from '@api/common/resource';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] resource')
@Controller('common/resources/paginate')
@Auth('common.resource.get')
export class CommonPaginateResourcesController {
  constructor(private readonly handler: CommonPaginateResourcesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate resources' })
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
