import { ApiProperty } from '@nestjs/swagger';
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ toPascalCase getRelationshipModule }}Dto } from './../../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipModule }}/dto/{{ toKebabCase getRelationshipModule }}.dto';
{{/each}}
{{#each schema.properties.withRelationshipOneToOne}}
import { {{ toPascalCase getRelationshipModule }}Dto } from './../../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipModule }}/dto/{{ toKebabCase getRelationshipModule }}.dto';
{{/each}}

export class {{ toPascalCase schema.moduleName }}Dto
{
    {{#each schema.properties.dto}}
    {{#if (allowProperty ../schema.moduleName this) }}
{{#eq relationship ../relationship.MANY_TO_MANY}}
    @ApiProperty({
        type       : [{{ toPascalCase getRelationshipModule }}Dto],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase nativeName }}: {{ toPascalCase getRelationshipModule }}Dto[];
    {{else eq relationship ../relationship.ONE_TO_ONE}}
    @ApiProperty({
        type       : {{ toPascalCase getRelationshipModule }}Dto,
        description: '{{ toCamelCase name }} [input here api field description]',
        example    : '',
    })
    {{ toCamelCase name }}: {{ toPascalCase getRelationshipModule }}Dto;
    {{else eq type ../sqlType.ENUM}}
    @ApiProperty({
        type       : {{ getApiType }},
        enum       : [{{{ enumOptionsArrayItems }}}],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}: {{ getJavascriptType }};
    {{else}}
    @ApiProperty({
        type       : {{ getApiType }},
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}: {{ getJavascriptType }};
{{/eq}}

    {{/if}}
    {{/each}}
}