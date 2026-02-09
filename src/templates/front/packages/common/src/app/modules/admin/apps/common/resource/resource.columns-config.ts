/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const resourceColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.STRING,
        field: 'code',
        sort: 'code',
        translation: 'Code',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'name',
        sort: 'name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'common.IsActive',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'hasAttachments',
        sort: 'hasAttachments',
        translation: 'common.HasAttachments',
    },
];
