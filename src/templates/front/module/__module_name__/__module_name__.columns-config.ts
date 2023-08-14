import { ColumnConfig, ColumnDataType } from '@aurora';

export const {{ toCamelCase schema.moduleName }}ColumnsConfig: ColumnConfig[] = [
    {{#each schema.aggregateProperties.gridFields}}
    {{#if (isAllowProperty ../schema.moduleName this) }}
    {
        type       : ColumnDataType.{{ getColumnDataType }},
        field      : '{{ toCamelCase (getNameProperty this) }}',
        sort       : '{{ toCamelCase (getNameProperty this) }}',
        translation: '{{ toCamelCase ../schema.boundedContextName }}.{{ toPascalCase name }}',
    },
    {{/if}}
    {{/each}}
];