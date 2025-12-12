import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const commentColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.STRING,
        field: 'parent.name',
        searchableField: '$parent.name$',
        sort: 'parent.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'rowId',
        sort: 'rowId',
        translation: 'support.RowId',
    },
    {
        type: ColumnDataType.STRING,
        field: 'externalId',
        sort: 'externalId',
        translation: 'support.ExternalId',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'externalParent.name',
        searchableField: '$externalParent.name$',
        sort: 'externalParent.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'issue.name',
        searchableField: '$issue.name$',
        sort: 'issue.name',
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
    {
        type: ColumnDataType.STRING,
        field: 'accountUsername',
        sort: 'accountUsername',
        translation: 'support.AccountUsername',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'displayName',
        sort: 'displayName',
        translation: 'support.DisplayName',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'description',
        sort: 'description',
        translation: 'support.Description',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.JSONB,
        field: 'attachments',
        sort: 'attachments',
        translation: 'support.Attachments',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.JSONB,
        field: 'screenRecording',
        sort: 'screenRecording',
        translation: 'support.ScreenRecording',
        isUnaccent: true,
    },
];
