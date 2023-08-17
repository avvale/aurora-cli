/* eslint-disable indent */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'ApiProperty') path='@nestjs/swagger')
    )
~}}
{{#each (getWithImportRelationshipOneToOneProperties schema.aggregateProperties) }}
{{#unlessEq type ../propertyType.ID}}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase (getRelationshipBoundedContextNameProperty this ../schema)) 'Update' (toPascalCase (getRelationshipModuleNameProperty this ../schema)) 'ByIdDto') path=(sumStrings config.apiContainer '/' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '/' (toKebabCase (getRelationshipModuleNameProperty this ../schema))))
~}}
{{/unlessEq}}
{{/each}}
{{#if (hasEnumProperties schema.aggregateProperties) }}
{{#each (getEnumProperties schema.aggregateProperties) }}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase name)) path='@api/graphql')
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
        description: '{{ toCamelCase name }} [input here api field description]',
        example    : '{{ uuid name }}',
    })
    {{ toCamelCase name }}?: string;

{{/eq}}
{{#eq relationship.type ../relationshipType.MANY_TO_MANY}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : [String],
        description: '{{ toCamelCase name }} [input here api field description]',
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
        description: '{{ toCamelCase name }} [input here api field description]',
        example    : '{{ uuid name }}',
    })
    {{ toCamelCase name }}?: string;

{{else ~}}
    @ApiProperty({
        type       : {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}Update{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}ByIdDto,
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if (hasQuotationProperty this ../config) }}'{{/if }}{{ example }}{{#if (hasQuotationProperty this ../config) }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}?: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}Update{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}ByIdDto;

{{/eq}}
{{/eq}}
{{#eq type ../propertyType.ENUM}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
        enum       : [{{{ getPropertyStringEnumOptions this }}}],
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if (hasQuotationProperty this ../config) }}'{{/if }}{{ example }}{{#if (hasQuotationProperty this ../config) }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}?: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }};

{{/eq}}
{{#if ../isCommonProperty}}
    @ApiProperty({
        type       : {{ getSwaggerTypeProperty this ../config }},
        description: '{{ toCamelCase name }} [input here api field description]',
        {{#if example }}
        example    : {{#if (hasQuotationProperty this ../config) }}'{{/if }}{{ example }}{{#if (hasQuotationProperty this ../config) }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}: {{ getDtoTypeProperty this ../config }};

{{/if}}
{{/if}}
{{/each}}
}
