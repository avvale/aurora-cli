/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  OAuthApplicationDto,
  OAuthDeleteApplicationsHandler,
} from '@api/o-auth/application';
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

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/delete')
@Auth('oAuth.application.delete')
export class OAuthDeleteApplicationsController {
  constructor(private readonly handler: OAuthDeleteApplicationsHandler) {}

  @Delete()
  @ApiOperation({
    summary: 'Delete applications in batch according to query',
  })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [OAuthApplicationDto],
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
