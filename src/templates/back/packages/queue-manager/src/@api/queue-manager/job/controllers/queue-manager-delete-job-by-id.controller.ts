/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    QueueManagerDeleteJobByIdHandler,
    QueueManagerJobDto,
} from '@api/queue-manager/job';
import { Auth } from '@aurora/decorators';
import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[queue-manager] job')
@Controller('queue-manager/job/delete')
@Auth('queueManager.job.delete')
export class QueueManagerDeleteJobByIdController {
    constructor(private readonly handler: QueueManagerDeleteJobByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete job by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: QueueManagerJobDto,
    })
    async main(@Param('id') id: string, @Param('name') name?: string) {
        return await this.handler.main(id, name);
    }
}
