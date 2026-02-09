/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonGetLangsHandler, CommonLangDto } from '@api/common/lang';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] lang')
@Controller('common/langs/get')
@Auth('common.lang.get')
export class CommonGetLangsController {
  constructor(private readonly handler: CommonGetLangsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get langs according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [CommonLangDto],
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
