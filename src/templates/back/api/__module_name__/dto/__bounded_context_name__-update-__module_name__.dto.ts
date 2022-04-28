/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
{{#each schema.properties.withRelationshipOneToOne}}
{{#unlessEq type ../sqlType.ID }}
import { {{ toPascalCase getRelationshipBoundedContext }}Update{{ toPascalCase getRelationshipModule }}Dto } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipModule }}/dto/{{ toKebabCase getRelationshipBoundedContext }}-update-{{ toKebabCase getRelationshipModule }}.dto{{/if}}';
{{/unlessEq}}
{{/each}}
{{#if schema.properties.hasEnum}}
import { {{#each schema.properties.isEnum}}{{#unless @first}}, {{/unless}}{{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}{{/each}} } from '../../../../graphql';
{{/if}}

export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Dto
{
{{#each schema.properties.updateDtoProperties}}
{{setVar 'isCommonProperty' true ~}}
{{#if (allowProperty ../schema.moduleName this) }}
{{#eq relationship ../relationship.MANY_TO_ONE}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase name }} [input here api field description]',
        example    : '{{ uuid }}',
    })
    {{ toCamelCase name }}?: string;

{{/eq}}
{{#eq relationship ../relationship.MANY_TO_MANY}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : [String],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase relationshipSingularName }}Ids?: string[];

{{/eq}}
{{#eq relationship ../relationship.ONE_TO_MANY}}{{setVar 'isCommonProperty' false ~}}{{/eq ~}} 
{{#eq relationship ../relationship.ONE_TO_ONE}}
    {{setVar 'isCommonProperty' false ~}}
{{#eq type ../sqlType.ID ~}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase name }} [input here api field description]',
        example    : '{{ uuid }}',
    })
    {{ toCamelCase name }}?: string;

{{else ~}}
    @ApiProperty({
        type       : {{ toPascalCase getRelationshipBoundedContext }}Update{{ toPascalCase getRelationshipModule }}Dto,
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}?: {{ toPascalCase getRelationshipBoundedContext }}Update{{ toPascalCase getRelationshipModule }}Dto;

{{/eq}}
{{/eq}}
{{#eq type ../sqlType.ENUM}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
        enum       : [{{{ enumOptionsArrayItems }}}],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}?: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }};

{{/eq}}
{{#if ../isCommonProperty}}
    @ApiProperty({
        type       : {{ getSwaggerType }},
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}: {{ getDtoType }};

{{/if}}
{{/if}}
{{/each}}
}