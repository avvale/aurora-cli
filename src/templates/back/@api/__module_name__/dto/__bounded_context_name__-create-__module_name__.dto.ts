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
        (object items=(sumStrings (toPascalCase (getRelationshipBoundedContextNameProperty this ../schema)) 'Create' (toPascalCase (getRelationshipModuleNameProperty this ../schema)) 'Dto') path=(sumStrings config.apiContainer '/' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '/' (toKebabCase (getRelationshipModuleNameProperty this ../schema))))
~}}
{{/unlessEq}}
{{/each}}
{{#if schema.aggregateProperties.hasEnum}}
{{#each schema.aggregateProperties.isEnum}}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase originName)) path='@api/graphql')
~}}
{{/each}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto
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
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: string;

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
    {{ toCamelCase relationship.singularName }}Ids{{#if nullable }}?{{/if}}: string[];

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
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: string;

{{else ~}}
    @ApiProperty({
        type       : {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}Create{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Dto,
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}Create{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Dto;

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
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase originName }};

{{/eq}}
{{#if ../isCommonProperty}}
    @ApiProperty({
        type       : {{ getSwaggerTypeProperty this ../config }},
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ getDtoTypeProperty this ../config }};

{{/if}}
{{/if}}
{{/each}}
}
