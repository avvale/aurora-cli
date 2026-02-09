/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonFindResourceHandler,
  CommonResourceDto,
} from '@api/common/resource';
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

@ApiTags('[common] resource')
@Controller('common/resource/find')
@Auth('common.resource.get')
export class CommonFindResourceController {
  constructor(private readonly handler: CommonFindResourceHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find resource according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CommonResourceDto,
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
