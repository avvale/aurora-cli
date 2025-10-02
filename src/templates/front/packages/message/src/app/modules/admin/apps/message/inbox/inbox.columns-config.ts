import { ColumnConfig, ColumnDataType } from '@aurora';

export const inboxColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.STRING,
        field: 'tenantIds',
        sort: 'tenantIds',
        translation: 'message.TenantIds',
        hidden: true,
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'sort',
        sort: 'sort',
        translation: 'message.Sort',
        hidden: true,
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
        type: ColumnDataType.STRING,
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
    /* {
        type       : ColumnDataType.STRING,
        field      : 'link',
        sort       : 'link',
        translation: 'message.Link',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isInternalLink',
        sort       : 'isInternalLink',
        translation: 'message.IsInternalLink',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'icon',
        sort       : 'icon',
        translation: 'message.Icon',
        isUnaccent : true,
    }, */
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isRead',
        sort: 'isRead',
        translation: 'message.IsRead',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isReadAtLeastOnce',
        sort: 'isReadAtLeastOnce',
        translation: 'message.IsReadAtLeastOnce',
    },
];
