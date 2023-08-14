/* eslint-disable indent */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'ApiProperty') path='@nestjs/swagger')
    )
~}}
{{#each (getWithImportRelationshipManyToManyProperties schema.aggregateProperties) }}
{{
    push ../importsArray
        (object
            items=(sumStrings (toPascalCase (getRelationshipBoundedContextNameProperty this ../schema)) (toPascalCase (getRelationshipModuleNameProperty this ../schema)) 'Dto')
            path=(sumStrings ../config.apiContainer '/' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '/' (toKebabCase (getRelationshipModuleNameProperty this ../schema)))
        )
~}}
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipManyToOne}}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase (getRelationshipBoundedContextNameProperty this ../schema)) (toPascalCase (getRelationshipModuleNameProperty this ../schema)) 'Dto') path=(sumStrings config.apiContainer '/' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '/' (toKebabCase (getRelationshipModuleNameProperty this ../schema))))
~}}
{{/unless}}
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipOneToMany}}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase (getRelationshipBoundedContextNameProperty this ../schema)) (toPascalCase (getRelationshipModuleNameProperty this ../schema)) 'Dto') path=(sumStrings config.apiContainer '/' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '/' (toKebabCase (getRelationshipModuleNameProperty this ../schema))))
~}}
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipOneToOne}}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase (getRelationshipBoundedContextNameProperty this ../schema)) (toPascalCase (getRelationshipModuleNameProperty this ../schema)) 'Dto') path=(sumStrings config.apiContainer '/' (toKebabCase (getRelationshipBoundedContextNameProperty this ../schema)) '/' (toKebabCase (getRelationshipModuleNameProperty this ../schema))))
~}}
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
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto
{
{{#each (getDtoProperties schema.aggregateProperties) }}
{{#if (isAllowProperty ../schema.moduleName this (object allowOneToManyRelationShip=true)) }}
{{setVar 'isCommonProperty' true ~}}
{{#eq relationship.type ../relationshipType.MANY_TO_ONE}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase originName }} [input here api field description]',
        example    : '{{ uuid originName }}',
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: string;

    @ApiProperty({
        type       : () => {{ relationship.aggregateName }}Dto,
        description: '{{ relationship.aggregateName }} [input here api field description]',
    })
    {{ toCamelCase relationship.field }}?: {{ relationship.aggregateName }}Dto;

{{/eq}}
{{#eq relationship.type ../relationshipType.MANY_TO_MANY}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : () => [{{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Dto],
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Dto[];

{{#if relationship.isDenormalized}}
    @ApiProperty({
        type       : Object,
        description: '{{ toCamelCase relationship.singularName }}Ids [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase relationship.singularName }}Ids{{#if nullable }}?{{/if}}: any;

{{/if}}
{{/eq}}
{{#eq relationship.type ../relationshipType.ONE_TO_MANY}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : () => [{{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Dto],
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Dto[];

{{/eq}}
{{#eq relationship.type ../relationshipType.ONE_TO_ONE}}
    {{setVar 'isCommonProperty' false ~}}
{{#eq type ../propertyType.ID ~}}
    @ApiProperty({
        type       : String,
        description: '{{ toCamelCase originName }} [input here api field description]',
        example    : '{{ uuid originName }}',
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: string;

    @ApiProperty({
        type       : () => {{ relationship.aggregateName }}Dto,
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase relationship.field }}?: {{ relationship.aggregateName }}Dto;

{{else ~}}
    @ApiProperty({
        type       : () => {{ relationship.aggregateName }}Dto,
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ relationship.aggregateName }}Dto;

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
