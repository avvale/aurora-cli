/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipModule }}/dto/{{ toKebabCase getRelationshipBoundedContext }}-{{ toKebabCase getRelationshipModule }}.dto{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipOneToMany}}
import { {{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipModule }}/dto/{{ toKebabCase getRelationshipBoundedContext }}-{{ toKebabCase getRelationshipModule }}.dto{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipOneToOne}}
import { {{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipModule }}/dto/{{ toKebabCase getRelationshipBoundedContext }}-{{ toKebabCase getRelationshipModule }}.dto{{/if}}';
{{/each}}
{{#if schema.properties.hasEnum}}
import { {{#each schema.properties.isEnum}}{{#unless @first}}, {{/unless}}{{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}{{/each}} } from '../../../../graphql';
{{/if}}

export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto
{
    {{#each schema.properties.dto}}
    {{#if (allowProperty ../schema.moduleName this) }}
{{#eq relationship ../relationship.MANY_TO_MANY}}
    @ApiProperty({
        type       : [{{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase nativeName }}{{#if nullable }}?{{/if}}: {{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto[];
    {{else eq relationship ../relationship.ONE_TO_MANY}}
    @ApiProperty({
        type       : [{{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase nativeName }}{{#if nullable }}?{{/if}}: {{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto[];
    {{else eq relationship ../relationship.ONE_TO_ONE}}
    @ApiProperty({
        type       : {{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto,
        description: '{{ toCamelCase name }} [input here api field description]',
        example    : '',
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto;
    {{else eq type ../sqlType.ENUM}}
    @ApiProperty({
        type       : {{ getApiType }},
        enum       : [{{{ enumOptionsArrayItems }}}],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }};
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