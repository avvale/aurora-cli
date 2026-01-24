/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentLibraryDto,
  CommonCreateAttachmentLibraryDto,
  CommonCreateAttachmentLibraryHandler,
} from '@api/common/attachment-library';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-library')
@Controller('common/attachment-library/create')
@Auth('common.attachmentLibrary.create')
export class CommonCreateAttachmentLibraryController {
  constructor(private readonly handler: CommonCreateAttachmentLibraryHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create attachment-library' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CommonAttachmentLibraryDto,
  })
  async main(
    @Body() payload: CommonCreateAttachmentLibraryDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
