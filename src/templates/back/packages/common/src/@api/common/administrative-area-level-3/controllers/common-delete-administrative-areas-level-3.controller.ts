/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAdministrativeAreaLevel3Dto,
  CommonDeleteAdministrativeAreasLevel3Handler,
} from '@api/common/administrative-area-level-3';
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

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-areas-level-3/delete')
@Auth('common.administrativeAreaLevel3.delete')
export class CommonDeleteAdministrativeAreasLevel3Controller {
  constructor(
    private readonly handler: CommonDeleteAdministrativeAreasLevel3Handler,
  ) {}

  @Delete()
  @ApiOperation({
    summary: 'Delete administrative-areas-level-3 in batch according to query',
  })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [CommonAdministrativeAreaLevel3Dto],
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
