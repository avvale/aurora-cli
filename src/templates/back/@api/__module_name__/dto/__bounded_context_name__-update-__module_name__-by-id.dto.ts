/* eslint-disable indent */
// import { ApiProperty } from '@nestjs/swagger';
// {{#each schema.properties.withImportRelationshipOneToOne}}
// {{#unlessEq type ../propertyType.ID }}
// import { {{ toPascalCase getRelationshipBoundedContextName }}Update{{ toPascalCase getRelationshipModuleName }}ByIdDto } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}../../../{{ toKebabCase getRelationshipBoundedContextName }}/{{ toKebabCase getRelationshipModuleName }}/dto/{{ toKebabCase getRelationshipBoundedContextName }}-update-{{ toKebabCase getRelationshipModuleName }}-by-id.dto{{/if}}';
// {{/unlessEq}}
// {{/each}}
// {{#if schema.properties.hasEnum}}
// import { {{#each schema.properties.isEnum}}{{#unless @first}}, {{/unless}}{{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase originName }}{{/each}} } from '@api/graphql';
// {{/if}}

{{
    setVar 'importsArray' (
        array
            (object items=(array 'ApiProperty') path='@nestjs/swagger')
    )
~}}
{{#each schema.properties.withImportRelationshipOneToOne}}
{{#unlessEq type ../propertyType.ID}}
{{ push ../importsArray
(object items=(sumStrings (toPascalCase getRelationshipBoundedContextName) 'Create' (toPascalCase getRelationshipModuleName) 'ByIdDto') path=(sumStrings config.apiContainer '/' (toKebabCase getRelationshipBoundedContextName) '/' (toKebabCase getRelationshipModuleName) '/dto/' (toKebabCase getRelationshipBoundedContextName) '-update-' (toKebabCase getRelationshipModuleName) '-by-id.dto'))
~}}
{{/unlessEq}}
{{/each}}
{{#if schema.properties.hasEnum}}
{{#each schema.properties.isEnum}}
{{#unless @first}},
{{/unless}}
{{ push ../importsArray
(object items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase originName)) path='@api/graphql')
~}}
{{/each}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto
{
{{#each schema.properties.dtoInputProperties}}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{setVar 'isCommonProperty' true ~}}
{{#eq relationship.type ../relationshipType.MANY_TO_ONE}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase originName }} [input here api field description]',
        example    : '{{ uuid originName }}',
    })
    {{ toCamelCase originName }}?: string;

{{/eq}}
{{#eq relationship.type ../relationshipType.MANY_TO_MANY}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : [String],
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase relationship.singularName }}Ids?: string[];

{{/eq}}
{{#eq relationship.type ../relationshipType.ONE_TO_MANY}}{{setVar 'isCommonProperty' false ~}}{{/eq ~}} 
{{#eq relationship.type ../relationshipType.ONE_TO_ONE}}
    {{setVar 'isCommonProperty' false ~}}
{{#eq type ../propertyType.ID ~}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase originName }} [input here api field description]',
        example    : '{{ uuid originName }}',
    })
    {{ toCamelCase originName }}?: string;

{{else ~}}
    @ApiProperty({
        type       : {{ toPascalCase getRelationshipBoundedContextName }}Update{{ toPascalCase getRelationshipModuleName }}ByIdDto,
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}?: {{ toPascalCase getRelationshipBoundedContextName }}Update{{ toPascalCase getRelationshipModuleName }}ByIdDto;

{{/eq}}
{{/eq}}
{{#eq type ../propertyType.ENUM}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase originName }},
        enum       : [{{{ enumOptionsArrayItems }}}],
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}?: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase originName }};

{{/eq}}
{{#if ../isCommonProperty}}
    @ApiProperty({
        type       : {{ getSwaggerType }},
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}{{#unlessEq originName 'id'}}?{{/unlessEq}}: {{ getDtoType }};

{{/if}}
{{/if}}
{{/each}}
}