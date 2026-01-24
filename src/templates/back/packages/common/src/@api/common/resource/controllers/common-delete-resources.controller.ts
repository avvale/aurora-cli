/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonDeleteResourcesHandler,
  CommonResourceDto,
} from '@api/common/resource';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] resource')
@Controller('common/resources/delete')
@Auth('common.resource.delete')
export class CommonDeleteResourcesController {
  constructor(private readonly handler: CommonDeleteResourcesHandler) {}

  @Delete()
  @ApiOperation({ summary: 'Delete resources in batch according to query' })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [CommonResourceDto],
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
