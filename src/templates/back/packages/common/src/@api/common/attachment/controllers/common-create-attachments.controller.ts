/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentDto,
  CommonCreateAttachmentDto,
  CommonCreateAttachmentsHandler,
} from '@api/common/attachment';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachments/create')
@Auth('common.attachment.create')
export class CommonCreateAttachmentsController {
  constructor(private readonly handler: CommonCreateAttachmentsHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create attachments in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [CommonAttachmentDto],
  })
  @ApiBody({ type: [CommonCreateAttachmentDto] })
  async main(
    @Body() payload: CommonCreateAttachmentDto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
