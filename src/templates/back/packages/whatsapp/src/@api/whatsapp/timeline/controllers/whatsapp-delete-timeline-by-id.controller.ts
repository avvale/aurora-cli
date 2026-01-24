/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  WhatsappDeleteTimelineByIdHandler,
  WhatsappTimelineDto,
} from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[whatsapp] timeline')
@Controller('whatsapp/timeline/delete')
@Auth('whatsapp.timeline.delete')
export class WhatsappDeleteTimelineByIdController {
  constructor(private readonly handler: WhatsappDeleteTimelineByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete timeline by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: WhatsappTimelineDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
