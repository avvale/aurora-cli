/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamFindTagHandler, IamTagDto } from '@api/iam/tag';
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

@ApiTags('[iam] tag')
@Controller('iam/tag/find')
@Auth('iam.tag.get')
export class IamFindTagController {
  constructor(private readonly handler: IamFindTagHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find tag according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: IamTagDto,
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
