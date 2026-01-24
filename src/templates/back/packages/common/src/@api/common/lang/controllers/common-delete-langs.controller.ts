/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonDeleteLangsHandler, CommonLangDto } from '@api/common/lang';
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

@ApiTags('[common] lang')
@Controller('common/langs/delete')
@Auth('common.lang.delete')
export class CommonDeleteLangsController {
  constructor(private readonly handler: CommonDeleteLangsHandler) {}

  @Delete()
  @ApiOperation({ summary: 'Delete langs in batch according to query' })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [CommonLangDto],
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
