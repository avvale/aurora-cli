import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ICommandBus, Operator } from '@aurora-ts/core';
import { DeleteSideEffectsCommand } from '@app/auditing/side-effect/application/delete/delete-side-effects.command';
import * as dayjs from 'dayjs';

@Injectable()
export class AuditingDeleteSideEffectTasksService
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    // @Cron(CronExpression.EVERY_YEAR) // Every year at 00:00:00
    // @Cron(CronExpression.EVERY_6_MONTHS) // Every six months at 00:00:00
    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT) // Every first day of the month at 00:00:00
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
                },
            ));

            Logger.debug('Delete side effects before ' + deleteBeforeAt, 'AuditingDeleteSideEffectTasksService');
        }
        catch (error)
        {
            Logger.error('Error to delete records from SideEffect table: ' +  error.message, 'AuditingDeleteSideEffectTasksService');
        }
    }
}