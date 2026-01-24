/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentLibraryDto,
  CommonCreateAttachmentLibrariesHandler,
  CommonCreateAttachmentLibraryDto,
} from '@api/common/attachment-library';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] attachment-library')
@Controller('common/attachment-libraries/create')
@Auth('common.attachmentLibrary.create')
export class CommonCreateAttachmentLibrariesController {
  constructor(
    private readonly handler: CommonCreateAttachmentLibrariesHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create attachment-libraries in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [CommonAttachmentLibraryDto],
  })
  @ApiBody({ type: [CommonCreateAttachmentLibraryDto] })
  async main(
    @Body() payload: CommonCreateAttachmentLibraryDto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
