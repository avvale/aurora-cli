/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentFamilyDto,
  CommonDeleteAttachmentFamilyByIdHandler,
} from '@api/common/attachment-family';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-family')
@Controller('common/attachment-family/delete')
@Auth('common.attachmentFamily.delete')
export class CommonDeleteAttachmentFamilyByIdController {
  constructor(
    private readonly handler: CommonDeleteAttachmentFamilyByIdHandler,
  ) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete attachment-family by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: CommonAttachmentFamilyDto,
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
