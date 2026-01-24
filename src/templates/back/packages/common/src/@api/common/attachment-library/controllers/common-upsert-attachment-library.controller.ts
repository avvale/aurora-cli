/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentLibraryDto,
  CommonUpdateAttachmentLibraryByIdDto,
  CommonUpsertAttachmentLibraryHandler,
} from '@api/common/attachment-library';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-library')
@Controller('common/attachment-library/upsert')
@Auth('common.attachmentLibrary.upsert')
export class CommonUpsertAttachmentLibraryController {
  constructor(private readonly handler: CommonUpsertAttachmentLibraryHandler) {}

  @Post()
  @ApiOperation({ summary: 'Upsert attachment-library' })
  @ApiCreatedResponse({
    description: 'The record has been successfully upserted.',
    type: CommonAttachmentLibraryDto,
  })
  async main(
    @Body() payload: CommonUpdateAttachmentLibraryByIdDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
