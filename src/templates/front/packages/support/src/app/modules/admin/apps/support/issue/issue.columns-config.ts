import { ColumnConfig, ColumnDataType } from '@aurora';
import { TranslocoService } from '@jsverse/transloco';

export const issueColumnsConfig: (properties?: {
    translator?: TranslocoService;
}) => ColumnConfig[] = ({
    translator = null,
}: {
    translator?: TranslocoService;
} = {}): ColumnConfig[] => [
    {
        type: ColumnDataType.STRING,
        field: 'externalStatus',
        sort: 'externalStatus',
        translation: 'support.ExternalStatus',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'displayName',
        sort: 'displayName',
        translation: 'support.DisplayName',
        isUnaccent: true,
        bodyClass: 'min-w-48',
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
        field: 'frontEnvironment',
        sort: 'frontEnvironment',
        translation: 'support.FrontEnvironment',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'frontVersion',
        sort: 'frontVersion',
        translation: 'support.FrontVersion',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'backEnvironment',
        sort: 'backEnvironment',
        translation: 'support.BackEnvironment',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'backVersion',
        sort: 'backVersion',
        translation: 'support.BackVersion',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'subject',
        sort: 'subject',
        translation: 'support.Subject',
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
