/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentDto,
  CommonUpdateAttachmentByIdDto,
  CommonUpsertAttachmentHandler,
} from '@api/common/attachment';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachment/upsert')
@Auth('common.attachment.upsert')
export class CommonUpsertAttachmentController {
  constructor(private readonly handler: CommonUpsertAttachmentHandler) {}

  @Post()
  @ApiOperation({ summary: 'Upsert attachment' })
  @ApiCreatedResponse({
    description: 'The record has been successfully upserted.',
    type: CommonAttachmentDto,
  })
  async main(
    @Body() payload: CommonUpdateAttachmentByIdDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
