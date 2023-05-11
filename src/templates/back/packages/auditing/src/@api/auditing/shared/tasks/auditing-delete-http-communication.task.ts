import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ICommandBus, Operator } from '@aurorajs.dev/core';
import { DeleteSideEffectsCommand } from '@app/auditing/side-effect/application/delete/delete-side-effects.command';
import * as dayjs from 'dayjs';

@Injectable()
export class AuditingDeleteHttpCommunicationTasksService
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    // @Cron(CronExpression.EVERY_YEAR) // Every year at 00:00:00
    // @Cron(CronExpression.EVERY_6_MONTHS) // Every six months at 00:00:00
    // @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT) // Every first day of the month at 00:00:00
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Every day at 00:00:00
    async handleCron(): Promise<void>
    {
        try
        {
            const deleteBeforeAt = dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss');

            await this.commandBus.dispatch(new DeleteSideEffectsCommand(
                {
                    where: {
                        createdAt: {
                            [Operator.lte]: deleteBeforeAt,
                        },
                    },
                    limit: 1000,
                },
            ));

            Logger.debug('Delete http communications before ' + deleteBeforeAt, 'AuditingDeleteHttpCommunicationTasksService');
        }
        catch (error)
        {
            Logger.error('Error to delete records from HttpCommunication table: ' + error.message, 'AuditingDeleteHttpCommunicationTasksService');
        }
    }
}