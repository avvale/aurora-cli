/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonPaginateAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-areas-level-2/paginate')
@Auth('common.administrativeAreaLevel2.get')
export class CommonPaginateAdministrativeAreasLevel2Controller {
  constructor(
    private readonly handler: CommonPaginateAdministrativeAreasLevel2Handler,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate administrative-areas-level-2' })
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
