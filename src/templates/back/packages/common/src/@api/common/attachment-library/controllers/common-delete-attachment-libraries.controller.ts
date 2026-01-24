/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentLibraryDto,
  CommonDeleteAttachmentLibrariesHandler,
} from '@api/common/attachment-library';
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

@ApiTags('[common] attachment-library')
@Controller('common/attachment-libraries/delete')
@Auth('common.attachmentLibrary.delete')
export class CommonDeleteAttachmentLibrariesController {
  constructor(
    private readonly handler: CommonDeleteAttachmentLibrariesHandler,
  ) {}

  @Delete()
  @ApiOperation({
    summary: 'Delete attachment-libraries in batch according to query',
  })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [CommonAttachmentLibraryDto],
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
