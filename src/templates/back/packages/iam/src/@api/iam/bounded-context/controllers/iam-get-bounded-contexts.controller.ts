/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamBoundedContextDto,
  IamGetBoundedContextsHandler,
} from '@api/iam/bounded-context';
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

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/get')
@Auth('iam.boundedContext.get')
export class IamGetBoundedContextsController {
  constructor(private readonly handler: IamGetBoundedContextsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get bounded-contexts according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [IamBoundedContextDto],
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
