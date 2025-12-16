import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const roleAccountColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.STRING,
        field: 'role.name',
        searchableField: '$role.name$',
        sort: 'role.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'account.name',
        searchableField: '$account.name$',
        sort: 'account.name',
        translation: 'Name',
        isUnaccent: true,
    },
];
