/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentDto,
  CommonDeleteAttachmentByIdHandler,
} from '@api/common/attachment';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachment/delete')
@Auth('common.attachment.delete')
export class CommonDeleteAttachmentByIdController {
  constructor(private readonly handler: CommonDeleteAttachmentByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete attachment by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: CommonAttachmentDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
