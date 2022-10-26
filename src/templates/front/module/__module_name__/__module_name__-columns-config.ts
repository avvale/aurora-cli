import { ColumnConfig, ColumnDataType } from '@aurora';

export const {{ toCamelCase schema.moduleName }}ColumnsConfig: ColumnConfig[] = [
    {{#each schema.properties.gridFields}}
    {{#if (allowProperty ../schema.moduleName this) }}
    {
        type : ColumnDataType.{{ getColumnDataType }},
        field: '{{ toCamelCase name }}',
        sort : '{{ toCamelCase name }}',
    },
    {{/if}}
    {{/each}}
];