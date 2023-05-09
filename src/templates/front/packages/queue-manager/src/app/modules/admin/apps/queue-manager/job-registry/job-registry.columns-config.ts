import { ColumnConfig, ColumnDataType } from '@aurora';

export const jobRegistryColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'queueName',
        sort       : 'queueName',
        translation: 'queueManager.QueueName',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'jobId',
        sort       : 'jobId',
        translation: 'queueManager.JobId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'jobName',
        sort       : 'jobName',
        translation: 'queueManager.JobName',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'tags',
        sort       : 'tags',
        translation: 'queueManager.Tags',
    },
];