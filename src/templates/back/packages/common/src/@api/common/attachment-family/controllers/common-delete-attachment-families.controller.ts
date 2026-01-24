/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentFamilyDto,
  CommonDeleteAttachmentFamiliesHandler,
} from '@api/common/attachment-family';
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

@ApiTags('[common] attachment-family')
@Controller('common/attachment-families/delete')
@Auth('common.attachmentFamily.delete')
export class CommonDeleteAttachmentFamiliesController {
  constructor(
    private readonly handler: CommonDeleteAttachmentFamiliesHandler,
  ) {}

  @Delete()
  @ApiOperation({
    summary: 'Delete attachment-families in batch according to query',
  })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [CommonAttachmentFamilyDto],
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
