import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const roleColumnsConfig: (properties?: {
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
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'defaultRedirection',
        sort: 'defaultRedirection',
        translation: 'iam.DefaultRedirection',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isMaster',
        sort: 'isMaster',
        translation: 'IsMaster',
    },
];
