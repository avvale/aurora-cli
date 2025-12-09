import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const webhookColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.STRING,
        field: 'name',
        sort: 'name',
        translation: 'tools.Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'service',
        sort: 'service',
        translation: 'tools.Service',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'endpoint',
        sort: 'endpoint',
        translation: 'tools.Endpoint',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'externalId',
        sort: 'externalId',
        translation: 'tools.ExternalId',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'events',
        sort: 'events',
        translation: 'tools.Events',
    },
    {
        type: ColumnDataType.STRING,
        field: 'secret',
        sort: 'secret',
        translation: 'tools.Secret',
        isUnaccent: true,
    },
];
