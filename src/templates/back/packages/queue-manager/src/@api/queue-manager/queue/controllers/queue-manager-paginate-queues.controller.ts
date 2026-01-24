/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueueManagerPaginateQueuesHandler } from '@api/queue-manager/queue';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[queue-manager] queue')
@Controller('queue-manager/queues/paginate')
@Auth('queueManager.queue.get')
export class QueueManagerPaginateQueuesController {
  constructor(private readonly handler: QueueManagerPaginateQueuesHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate queues' })
  @ApiOkResponse({
    description: 'The records has been paginated successfully.',
    type: Pagination,
  })
  @ApiQuery({ name: 'queryStatement', type: QueryStatement })
  @ApiQuery({ name: 'constraint', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
