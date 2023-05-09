import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QueueStorage } from 'src/app.queues';
import { QueueManagerJobService } from '@api/queue-manager/job/shared/services/job.service';

@Injectable()
export class QueueManagerSendEmailTasksService
{
    constructor(
        private readonly jobService: QueueManagerJobService,
        @InjectQueue(QueueStorage.COMMON_MAIL) private commonMailQueue: Queue,
    ) {}

    // @Cron(CronExpression.EVERY_YEAR) // Every year at 00:00:00
    // @Cron(CronExpression.EVERY_6_MONTHS) // Every six months at 00:00:00
    // @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT) // Every first day of the month at 00:00:00
    @Cron(CronExpression.EVERY_MINUTE) // Every day at 00:00:00
    async handleCron(): Promise<void>
    {
        this.jobService.add(
            this.commonMailQueue,
            {
                foo: 'bar',
            },
            ['common-mail', 'cpalacin@syscover.com'],
        );
    }
}