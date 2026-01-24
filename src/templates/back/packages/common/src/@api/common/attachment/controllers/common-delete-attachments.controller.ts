/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentDto,
  CommonDeleteAttachmentsHandler,
} from '@api/common/attachment';
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

@ApiTags('[common] attachment')
@Controller('common/attachments/delete')
@Auth('common.attachment.delete')
export class CommonDeleteAttachmentsController {
  constructor(private readonly handler: CommonDeleteAttachmentsHandler) {}

  @Delete()
  @ApiOperation({ summary: 'Delete attachments in batch according to query' })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [CommonAttachmentDto],
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
