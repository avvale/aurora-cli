// ignored file
import { ColumnConfig, ColumnDataType } from '@aurora';

export const queueColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'prefix',
        sort       : 'prefix',
        translation: 'queueManager.Prefix',
    },
    {
        type : ColumnDataType.STRING,
        field: 'name',
        sort : 'name',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'waitingJobs',
        sort       : 'waitingJobs',
        translation: 'queueManager.WaitingJobs',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'activeJobs',
        sort       : 'activeJobs',
        translation: 'queueManager.ActiveJobs',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'completedJobs',
        sort       : 'completedJobs',
        translation: 'queueManager.CompletedJobs',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'failedJobs',
        sort       : 'failedJobs',
        translation: 'queueManager.FailedJobs',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'delayedJobs',
        sort       : 'delayedJobs',
        translation: 'queueManager.DelayedJobs',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'pausedJobs',
        sort       : 'pausedJobs',
        translation: 'queueManager.PausedJobs',
    },
];