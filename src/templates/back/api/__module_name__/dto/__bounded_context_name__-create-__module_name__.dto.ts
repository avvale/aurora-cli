/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
{{#each schema.properties.withRelationshipOneToOne}}
{{#unlessEq type ../sqlType.ID }}
import { {{ toPascalCase getRelationshipBoundedContext }}Create{{ toPascalCase getRelationshipModule }}Dto } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../{{ toKebabCase getRelationshipBoundedContext }}/{{ toKebabCase getRelationshipModule }}/dto/{{ toKebabCase getRelationshipBoundedContext }}-create-{{ toKebabCase getRelationshipModule }}.dto{{/if}}';
{{/unlessEq}}
{{/each}}
{{#if schema.properties.hasEnum}}
import { {{#each schema.properties.isEnum}}{{#unless @first}}, {{/unless}}{{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase originName }}{{/each}} } from '../../../../../graphql';
{{/if}}

export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto
{
{{#each schema.properties.dtoInputProperties}}
{{#if (allowProperty ../schema.moduleName this) }}
{{setVar 'isCommonProperty' true ~}}
{{#eq relationship ../relationship.MANY_TO_ONE}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase originName }} [input here api field description]',
        example    : '{{ uuid }}',
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: string;

{{/eq}}
{{#eq relationship ../relationship.MANY_TO_MANY}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : [String],
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase relationshipSingularName }}Ids{{#if nullable }}?{{/if}}: string[];

{{/eq}}
{{#eq relationship ../relationship.ONE_TO_MANY}}{{setVar 'isCommonProperty' false ~}}{{/eq ~}}
{{#eq relationship ../relationship.ONE_TO_ONE}}
    {{setVar 'isCommonProperty' false ~}}
{{#eq type ../sqlType.ID ~}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase originName }} [input here api field description]',
        example    : '{{ uuid }}',
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: string;

{{else ~}}
    @ApiProperty({
        type       : {{ toPascalCase getRelationshipBoundedContext }}Create{{ toPascalCase getRelationshipModule }}Dto,
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ toPascalCase getRelationshipBoundedContext }}Create{{ toPascalCase getRelationshipModule }}Dto;

{{/eq}}
{{/eq}}
{{#eq type ../sqlType.ENUM}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase originName }},
        enum       : [{{{ enumOptionsArrayItems }}}],
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase originName }};

{{/eq}}
{{#if ../isCommonProperty}}
    @ApiProperty({
        type       : {{ getSwaggerType }},
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ getDtoType }};

{{/if}}
{{/if}}
{{/each}}
}