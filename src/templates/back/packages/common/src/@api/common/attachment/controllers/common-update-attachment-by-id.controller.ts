/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentDto,
  CommonUpdateAttachmentByIdDto,
  CommonUpdateAttachmentByIdHandler,
} from '@api/common/attachment';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachment/update')
@Auth('common.attachment.update')
export class CommonUpdateAttachmentByIdController {
  constructor(private readonly handler: CommonUpdateAttachmentByIdHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update attachment by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: CommonAttachmentDto,
  })
  async main(
    @Body() payload: CommonUpdateAttachmentByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
