/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  WhatsappGetTimelinesHandler,
  WhatsappTimelineDto,
} from '@api/whatsapp/timeline';
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

@ApiTags('[whatsapp] timeline')
@Controller('whatsapp/timelines/get')
@Auth('whatsapp.timeline.get')
export class WhatsappGetTimelinesController {
  constructor(private readonly handler: WhatsappGetTimelinesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get timelines according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [WhatsappTimelineDto],
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
