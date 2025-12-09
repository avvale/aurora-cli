import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const permissionRoleColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.STRING,
        field: 'permission.name',
        searchableField: '$permission.name$',
        sort: 'permission.name',
        translation: 'Name',
        isUnaccent: true,
    },
];
