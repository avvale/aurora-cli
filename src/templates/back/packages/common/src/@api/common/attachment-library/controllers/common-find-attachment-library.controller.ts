/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentLibraryDto,
  CommonFindAttachmentLibraryHandler,
} from '@api/common/attachment-library';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[common] attachment-library')
@Controller('common/attachment-library/find')
@Auth('common.attachmentLibrary.get')
export class CommonFindAttachmentLibraryController {
  constructor(private readonly handler: CommonFindAttachmentLibraryHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find attachment-library according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CommonAttachmentLibraryDto,
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
