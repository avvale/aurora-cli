/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentFamilyDto,
  CommonUpdateAttachmentFamiliesDto,
  CommonUpdateAttachmentFamiliesHandler,
} from '@api/common/attachment-family';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-family')
@Controller('common/attachment-families/update')
@Auth('common.attachmentFamily.update')
export class CommonUpdateAttachmentFamiliesController {
  constructor(
    private readonly handler: CommonUpdateAttachmentFamiliesHandler,
  ) {}

  @Put()
  @ApiOperation({ summary: 'Update attachment-families' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: CommonAttachmentFamilyDto,
  })
  async main(
    @Body() payload: CommonUpdateAttachmentFamiliesDto,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
