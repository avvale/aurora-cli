import { ColumnConfig, ColumnDataType } from '@aurora';

export const {{ toCamelCase schema.moduleName }}ColumnsConfig: ColumnConfig[] = [
    {{#each (getGridFieldsProperties schema.aggregateProperties) }}
    {{#if (isAllowProperty ../schema.moduleName this) }}
    {
        type       : ColumnDataType.{{ getPropertyColumnDataType this ../config }},
        field      : '{{ toCamelCase (getNameProperty this) }}',
        sort       : '{{ toCamelCase (getNameProperty this) }}',
        translation: '{{ toCamelCase ../schema.boundedContextName }}.{{ toPascalCase (getNameProperty this) }}',
    },
    {{/if}}
    {{/each}}
];