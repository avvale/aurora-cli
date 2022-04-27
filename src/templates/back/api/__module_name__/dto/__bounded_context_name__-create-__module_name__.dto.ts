/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
{{#each schema.properties.withRelationshipOneToOne}}
{{#unlessEq type ../sqlType.ID }}
import { {{ toPascalCase getRelationshipBoundedContext }}Create{{ toPascalCase getRelationshipModule }}Dto } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipModule }}/dto/{{ toKebabCase getRelationshipBoundedContext }}-create-{{ toKebabCase getRelationshipModule }}.dto{{/if}}';
{{/unlessEq}}
{{/each}}
{{#if schema.properties.hasEnum}}
import { {{#each schema.properties.isEnum}}{{#unless @first}}, {{/unless}}{{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}{{/each}} } from '../../../../graphql';
{{/if}}

export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto
{
    {{#each schema.properties.createDto}}
    {{#if (allowProperty ../schema.moduleName this) }}
{{#eq relationship ../relationship.MANY_TO_ONE}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase name }} [input here api field description]',
        example    : '{{ uuid }}',
    })
    {{ toCamelCase nativeName }}{{#if nullable }}?{{/if}}: string;
    {{else eq relationship ../relationship.MANY_TO_MANY}}
    @ApiProperty({
        type       : [String],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: string[];
    {{else eq relationship ../relationship.ONE_TO_ONE}}
    @ApiProperty({
        type       : {{ getDtoCreateType }},
        description: '{{ toCamelCase name }} [input here api field description]',
        example    : '',
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{#eq type ../sqlType.ID }}string{{else}}{{ getDtoCreateType }}{{/eq}};
    {{else eq type ../sqlType.ENUM}}
    @ApiProperty({
        type       : {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
        enum       : [{{{ enumOptionsArrayItems }}}],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }};
    {{else}}
    @ApiProperty({
        type       : {{ getSwaggerType }},
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ getDtoType }};
{{/eq}}

    {{/if}}
    {{/each}}
}