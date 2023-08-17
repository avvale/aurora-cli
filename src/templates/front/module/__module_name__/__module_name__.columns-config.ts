import { ColumnConfig, ColumnDataType } from '@aurora';

export const {{ toCamelCase schema.moduleName }}ColumnsConfig: ColumnConfig[] = [
    {{#each (getGridFieldsProperties schema.aggregateProperties) }}
    {{#if (isAllowProperty ../schema.moduleName this) }}
    {
        type       : ColumnDataType.{{ getPropertyColumnDataType this ../config }},
        field      : '{{ toCamelCase (getPropertyName this) }}',
        sort       : '{{ toCamelCase (getPropertyName this) }}',
        translation: '{{ toCamelCase ../schema.boundedContextName }}.{{ toPascalCase (getPropertyName this) }}',
    },
    {{/if}}
    {{/each}}
];