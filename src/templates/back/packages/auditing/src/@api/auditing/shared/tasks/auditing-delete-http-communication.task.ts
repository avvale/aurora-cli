import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ICommandBus, Operator } from '@aurorajs.dev/core';
import { AuditingDeleteSideEffectsCommand } from '@app/auditing/side-effect';
import * as dayjs from 'dayjs';

@Injectable()
export class AuditingDeleteHttpCommunicationTask
{
    private readonly logger = new Logger(AuditingDeleteHttpCommunicationTask.name);

    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
        name    : 'AuditingDeleteHttpCommunicationTask',
        timeZone: 'Europe/Madrid',
    })
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

            this.logger.debug('Delete http communications before ' + deleteBeforeAt, 'AuditingDeleteHttpCommunicationTasksService');
        }
        catch (error)
        {
            this.logger.error('Error to delete records from HttpCommunication table: ' + error.message, 'AuditingDeleteHttpCommunicationTasksService');
        }
    }
}