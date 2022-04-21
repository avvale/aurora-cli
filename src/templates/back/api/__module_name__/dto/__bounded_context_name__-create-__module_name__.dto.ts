/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto
{
    {{#each schema.properties.createDto}}
    {{#if (allowProperty ../schema.moduleName this) }}
{{#eq relationship ../relationship.MANY_TO_MANY}}
    @ApiProperty({
        type       : [String],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: string[];
    {{else eq type ../sqlType.ENUM}}
    @ApiProperty({
        type       : {{ getApiType }},
        enum       : [{{{ enumOptionsArrayItems }}}],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ getJavascriptType }};
    {{else}}
    @ApiProperty({
        type       : {{ getApiType }},
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ getJavascriptType }};
{{/eq}}

    {{/if}}
    {{/each}}
}