/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  QueueManagerQueueDto,
  QueueManagerUpdateQueuesDto,
  QueueManagerUpdateQueuesHandler,
} from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queues/update')
@Auth('queueManager.queue.update')
export class QueueManagerUpdateQueuesController {
  constructor(private readonly handler: QueueManagerUpdateQueuesHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update queues' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: QueueManagerQueueDto,
  })
  async main(
    @Body() payload: QueueManagerUpdateQueuesDto,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
    );
  }
}
