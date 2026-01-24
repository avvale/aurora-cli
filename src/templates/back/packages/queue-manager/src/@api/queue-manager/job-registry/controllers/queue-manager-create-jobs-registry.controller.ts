/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  QueueManagerCreateJobRegistryDto,
  QueueManagerCreateJobsRegistryHandler,
  QueueManagerJobRegistryDto,
} from '@api/queue-manager/job-registry';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[queue-manager] job-registry')
@Controller('queue-manager/jobs-registry/create')
@Auth('queueManager.jobRegistry.create')
export class QueueManagerCreateJobsRegistryController {
  constructor(
    private readonly handler: QueueManagerCreateJobsRegistryHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create jobs-registry in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [QueueManagerJobRegistryDto],
  })
  @ApiBody({ type: [QueueManagerCreateJobRegistryDto] })
  async main(
    @Body() payload: QueueManagerCreateJobRegistryDto[],
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(payload, timezone);
  }
}
