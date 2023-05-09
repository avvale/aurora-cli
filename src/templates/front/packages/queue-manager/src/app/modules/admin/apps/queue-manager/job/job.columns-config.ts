import { ColumnConfig, ColumnDataType } from '@aurora';

export const jobColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.STRING,
        field: 'id',
        sort : 'id',
    },
    {
        type : ColumnDataType.STRING,
        field: 'name',
        sort : 'name',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'delay',
        sort       : 'delay',
        translation: 'queueManager.Delay',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'attemptsMade',
        sort       : 'attemptsMade',
        translation: 'queueManager.AttemptsMade',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'processedOn',
        sort       : 'processedOn',
        translation: 'queueManager.ProcessedOn',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'progress',
        sort       : 'progress',
        translation: 'queueManager.Progress',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'finishedOn',
        sort       : 'finishedOn',
        translation: 'queueManager.FinishedOn',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'timestamp',
        sort       : 'timestamp',
        translation: 'queueManager.Timestamp',
    },
];