/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipModule }}/dto/{{ toKebabCase getRelationshipBoundedContext }}-{{ toKebabCase getRelationshipModule }}.dto{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipManyToOne}}
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
{{#each schema.properties.dtoProperties}}
{{setVar 'isCommonProperty' true ~}}
{{#if (allowProperty ../schema.moduleName this) }}
{{#eq relationship ../relationship.MANY_TO_ONE}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase name }} [input here api field description]',
        example    : '{{ uuid }}',
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: string;

    @ApiProperty({
        type       : {{ relationshipAggregate }}Dto,
        description: '{{ relationshipAggregate }} [input here api field description]',
    })
    {{ toCamelCase relationshipField }}?: {{ relationshipAggregate }}Dto;

{{/eq}}
{{#eq relationship ../relationship.MANY_TO_MANY}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : [{{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto[];

{{/eq}}
{{#eq relationship ../relationship.ONE_TO_MANY}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : [{{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ toPascalCase getRelationshipBoundedContext }}{{ toPascalCase getRelationshipModule }}Dto[];

{{/eq}}
{{#eq relationship ../relationship.ONE_TO_ONE}}
    {{setVar 'isCommonProperty' false ~}}
{{#eq type ../sqlType.ID ~}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase name }} [input here api field description]',
        example    : '{{ uuid }}',
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: string;

    @ApiProperty({
        type       : {{ relationshipAggregate }}Dto,
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase relationshipField }}{{#if nullable }}?{{/if}}: {{ relationshipAggregate }}Dto;

{{else ~}}
    @ApiProperty({
        type       : {{ relationshipAggregate }}Dto,
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ relationshipAggregate }}Dto;

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
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }};

{{/eq}}
{{#if ../isCommonProperty}}
    @ApiProperty({
        type       : {{ getSwaggerType }},
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}{{#if nullable }}?{{/if}}: {{ getDtoType }};

{{/if}}
{{/if}}
{{/each}}
}