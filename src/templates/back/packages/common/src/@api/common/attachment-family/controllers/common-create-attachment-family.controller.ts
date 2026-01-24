/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentFamilyDto,
  CommonCreateAttachmentFamilyDto,
  CommonCreateAttachmentFamilyHandler,
} from '@api/common/attachment-family';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-family')
@Controller('common/attachment-family/create')
@Auth('common.attachmentFamily.create')
export class CommonCreateAttachmentFamilyController {
  constructor(private readonly handler: CommonCreateAttachmentFamilyHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create attachment-family' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CommonAttachmentFamilyDto,
  })
  async main(
    @Body() payload: CommonCreateAttachmentFamilyDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
