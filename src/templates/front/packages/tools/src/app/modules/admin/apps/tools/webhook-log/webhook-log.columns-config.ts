import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const webhookLogColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.NUMBER,
        field: 'rowId',
        sort: 'rowId',
        translation: 'RowId',
    },
    {
        type: ColumnDataType.STRING,
        field: 'url',
        sort: 'url',
        translation: 'tools.Url',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.DATE,
        field: 'createdAt',
        sort: 'createdAt',
        translation: 'Created.M',
        isUnaccent: true,
    },
];
