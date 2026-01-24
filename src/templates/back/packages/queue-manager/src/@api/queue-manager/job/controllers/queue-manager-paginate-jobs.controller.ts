/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { QueueManagerPaginateJobsHandler } from '@api/queue-manager/job';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[queue-manager] job')
@Controller('queue-manager/jobs/paginate')
@Auth('queueManager.job.get')
export class QueueManagerPaginateJobsController {
  constructor(private readonly handler: QueueManagerPaginateJobsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate jobs' })
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
