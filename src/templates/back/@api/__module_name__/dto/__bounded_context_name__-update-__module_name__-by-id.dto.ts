/* eslint-disable indent */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'ApiProperty') path='@nestjs/swagger')
    )
~}}
{{#each schema.aggregateProperties.withImportRelationshipOneToOne}}
{{#unlessEq type ../propertyType.ID}}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase (getRelationshipBoundedContextNameProperty this ../schema)) 'Update' (toPascalCase (getRelationshipModuleNameProperty this ../schema)) 'ByIdDto') path=(sumStrings config.apiContainer '/' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '/' (toKebabCase (getRelationshipModuleNameProperty this ../schema))))
~}}
{{/unlessEq}}
{{/each}}
{{#if schema.aggregateProperties.hasEnum}}
{{#each (getEnumProperties schema.aggregateProperties) }}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase originName)) path='@api/graphql')
~}}
{{/each}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto
{
{{#each (gerDtoInputProperties schema.aggregateProperties) }}
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
        type       : {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}Update{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}ByIdDto,
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}?: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}Update{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}ByIdDto;

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
        type       : {{ getSwaggerTypeProperty this ../config }},
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}{{#unlessEq originName 'id'}}?{{/unlessEq}}: {{ getDtoTypeProperty this ../config }};

{{/if}}
{{/if}}
{{/each}}
}
