import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const inboxColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.STRING,
        field: 'tenantIds',
        sort: 'tenantIds',
        translation: 'message.TenantIds',
        hidden: true,
        searchable: false,
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'messageRowId',
        sort: 'messageRowId',
        translation: 'message.MessageRowId',
        hidden: true,
        searchable: false,
    },
    {
        type: ColumnDataType.STRING,
        field: 'accountCode',
        sort: 'accountCode',
        translation: 'message.AccountCode',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isImportant',
        sort: 'isImportant',
        translation: 'message.IsImportant',
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'sentAt',
        sort: 'sentAt',
        translation: 'message.SentAt',
    },
    {
        type: ColumnDataType.STRING,
        field: 'subject',
        sort: 'subject',
        translation: 'message.Subject',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'body',
        sort: 'body',
        translation: 'message.Body',
        isUnaccent: true,
        hidden: true,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isRead',
        sort: 'isRead',
        translation: 'message.IsRead',
        searchable: false,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isReadAtLeastOnce',
        sort: 'isReadAtLeastOnce',
        translation: 'message.IsReadAtLeastOnce',
        searchable: false,
    },
];
