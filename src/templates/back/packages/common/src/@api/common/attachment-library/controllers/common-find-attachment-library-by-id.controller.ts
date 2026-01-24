/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentLibraryDto,
  CommonFindAttachmentLibraryByIdHandler,
} from '@api/common/attachment-library';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-library')
@Controller('common/attachment-library/find')
@Auth('common.attachmentLibrary.get')
export class CommonFindAttachmentLibraryByIdController {
  constructor(
    private readonly handler: CommonFindAttachmentLibraryByIdHandler,
  ) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find attachment-library by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: CommonAttachmentLibraryDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
