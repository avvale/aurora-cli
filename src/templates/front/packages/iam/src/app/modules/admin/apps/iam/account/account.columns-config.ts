import { ColumnConfig, ColumnDataType, getFieldValuesFromEnum, SearchComponentType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const accountColumnsConfig: (
     param?: {
        translocoService?: TranslocoService;
        tenantsAsyncMatSelectSearch?: unknown;
        scopesAsyncMatSelectSearch?: unknown;
        tagsAsyncMatSelectSearch?: unknown;
    }
) => ColumnConfig[] = (
    {
        translocoService = null,
        tenantsAsyncMatSelectSearch = null,
        scopesAsyncMatSelectSearch = null,
        tagsAsyncMatSelectSearch = null,
    }: {
        translocoService?: TranslocoService;
        tenantsAsyncMatSelectSearch?: unknown;
        scopesAsyncMatSelectSearch?: unknown;
        tagsAsyncMatSelectSearch?: unknown;
    } = {},
) => [
    /*
    Account types currently disabled; user accounts and service accounts are displayed in separate sections.
    {
        type: ColumnDataType.ENUM,
        field: 'type',
        sort: 'type',
        translation: 'Type',
        searchable: false,
        fieldValues: () => getFieldValuesFromEnum(IamAccountType, value => `${translocoService && translocoService.translate('AccountTypes.' + value)}`),
    },
    */
    {
        type: ColumnDataType.ARRAY,
        searchComponent: SearchComponentType.ASYNC_MULTIPLE_SELECT,
        searchableField: 'dTenants',
        searchableFieldType: ColumnDataType.ARRAY,
        field: 'tenants',
        translation: 'Tenants',
        meta: {
            asyncMatSelectSearch: tenantsAsyncMatSelectSearch,
        },
    },
    {
        type: ColumnDataType.ARRAY,
        searchComponent: SearchComponentType.ASYNC_MULTIPLE_SELECT,
        field: 'scopes',
        translation: 'Scopes',
        meta: {
            asyncMatSelectSearch: scopesAsyncMatSelectSearch,
        },
    },
    {
        type: ColumnDataType.ARRAY,
        searchComponent: SearchComponentType.ASYNC_MULTIPLE_SELECT,
        field: 'tags',
        translation: 'Tags',
        meta: {
            asyncMatSelectSearch: tagsAsyncMatSelectSearch,
        },
    },
    {
        type: ColumnDataType.STRING,
        field: 'email',
        sort: 'email',
        translation: 'Email',
    },
    {
        type: ColumnDataType.STRING,
        field: 'username',
        sort: 'username',
        translation: 'Username',
    },
    {
        type: ColumnDataType.STRING,
        field: 'user.name',
        searchableField: '$user.name$',
        sort: 'user.name',
        translation: 'Name',
        bodyClass: 'min-w-48',
    },
    {
        type: ColumnDataType.STRING,
        field: 'user.surname',
        searchableField: '$user.surname$',
        sort: 'user.surname',
        translation: 'Surname',
        bodyClass: 'min-w-48',
    },
    {
        type: ColumnDataType.STRING,
        field: 'code',
        sort: 'code',
        translation: 'Code',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'Active',
    },
];
