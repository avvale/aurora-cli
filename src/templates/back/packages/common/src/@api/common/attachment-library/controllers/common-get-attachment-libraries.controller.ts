/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonAttachmentLibraryDto,
  CommonGetAttachmentLibrariesHandler,
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
@Controller('common/attachment-libraries/get')
@Auth('common.attachmentLibrary.get')
export class CommonGetAttachmentLibrariesController {
  constructor(private readonly handler: CommonGetAttachmentLibrariesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get attachment-libraries according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [CommonAttachmentLibraryDto],
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
