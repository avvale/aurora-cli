import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const messageColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.STRING,
        field: 'subject',
        sort: 'subject',
        translation: 'message.Subject',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.ARRAY,
        field: 'tenantIds',
        sort: 'tenantIds',
        translation: 'message.TenantIds',
        hidden: true,
        searchable: false,
    },
    {
        type: ColumnDataType.ENUM,
        field: 'status',
        sort: 'status',
        translation: 'message.Status',
    },
    {
        type: ColumnDataType.ARRAY,
        field: 'accountRecipientIds',
        sort: 'accountRecipientIds',
        translation: 'message.AccountRecipientIds',
        hidden: true,
        searchable: false,
    },
    {
        type: ColumnDataType.ARRAY,
        field: 'tenantRecipientIds',
        sort: 'tenantRecipientIds',
        translation: 'message.TenantRecipientIds',
        hidden: true,
        searchable: false,
    },
    {
        type: ColumnDataType.ARRAY,
        field: 'scopeRecipients',
        sort: 'scopeRecipients',
        translation: 'message.ScopeRecipients',
        hidden: true,
        searchable: false,
    },
    {
        type: ColumnDataType.ARRAY,
        field: 'tagRecipients',
        sort: 'tagRecipients',
        translation: 'message.TagRecipients',
        hidden: true,
        searchable: false,
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'sendAt',
        sort: 'sendAt',
        translation: 'message.SendAt',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isImportant',
        sort: 'isImportant',
        translation: 'message.IsImportant',
    },
    {
        type: ColumnDataType.STRING,
        field: 'body',
        sort: 'body',
        translation: 'message.Body',
        isUnaccent: true,
        hidden: true,
        searchable: false,
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'totalRecipients',
        sort: 'totalRecipients',
        translation: 'message.TotalRecipients',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'reads',
        sort: 'reads',
        translation: 'message.Reads',
    },
];
