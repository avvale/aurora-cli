import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ICommandBus, Operator } from '@aurorajs.dev/core';
import { AuditingDeleteSideEffectsCommand } from '@app/auditing/side-effect';
import * as dayjs from 'dayjs';

@Injectable()
export class AuditingDeleteSideEffectTasksService
{
    private readonly logger = new Logger(AuditingDeleteSideEffectTasksService.name);

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
            const deleteBeforeAt = dayjs()
                .subtract(1, 'month')
                .format('YYYY-MM-DD HH:mm:ss');

            await this.commandBus.dispatch(new AuditingDeleteSideEffectsCommand(
                {
                    where: {
                        createdAt: {
                            [Operator.lte]: deleteBeforeAt,
                        },
                    },
                    limit: 1000,
                },
            ));

            this.logger.log('Delete side effects before ' + deleteBeforeAt);
        }
        catch (error)
        {
            this.logger.error('Error to delete records from SideEffect table: ' + error.message);
        }
    }
}