import { ColumnConfig, ColumnDataType } from '@aurora';

export const roleColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'iam.Name',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isMaster',
        sort       : 'isMaster',
        translation: 'iam.IsMaster',
    },
];