/* eslint-disable indent */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'ApiProperty') path='@nestjs/swagger')
    )
~}}
{{#each schema.properties.withImportRelationshipManyToMany}}
{{ 
    push ../importsArray
        (object items=(sumStrings (toPascalCase getRelationshipBoundedContextName) (toPascalCase getRelationshipModuleName) 'Dto') path=(sumStrings config.apiContainer '/' (toKebabCase getRelationshipBoundedContextName) '/' (toKebabCase getRelationshipModuleName)))
~}}
{{/each}}
{{#each schema.properties.withImportRelationshipManyToOne}}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase getRelationshipBoundedContextName) (toPascalCase getRelationshipModuleName) 'Dto') path=(sumStrings config.apiContainer '/' (toKebabCase getRelationshipBoundedContextName) '/' (toKebabCase getRelationshipModuleName)))
~}}
{{/unless}}
{{/each}}
{{#each schema.properties.withImportRelationshipOneToMany}}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase getRelationshipBoundedContextName) (toPascalCase getRelationshipModuleName) 'Dto') path=(sumStrings config.apiContainer '/' (toKebabCase getRelationshipBoundedContextName) '/' (toKebabCase getRelationshipModuleName)))
~}}
{{/each}}
{{#each schema.properties.withImportRelationshipOneToOne}}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase getRelationshipBoundedContextName) (toPascalCase getRelationshipModuleName) 'Dto') path=(sumStrings config.apiContainer '/' (toKebabCase getRelationshipBoundedContextName) '/' (toKebabCase getRelationshipModuleName)))
~}}
{{/each}}
{{#if schema.properties.hasEnum}}
{{#each schema.properties.isEnum}}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase originName)) path='@api/graphql')
~}}
{{/each}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto
{
{{#each schema.properties.dtoProperties}}
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
        type       : () => {{ relationship.aggregate }}Dto,
        description: '{{ relationship.aggregate }} [input here api field description]',
    })
    {{ toCamelCase relationship.field }}?: {{ relationship.aggregate }}Dto;

{{/eq}}
{{#eq relationship.type ../relationshipType.MANY_TO_MANY}}
    {{setVar 'isCommonProperty' false ~}}
    @ApiProperty({
        type       : () => [{{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Dto],
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Dto[];

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
        type       : () => [{{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Dto],
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : '{{ example }}',
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Dto[];

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
        type       : () => {{ relationship.aggregate }}Dto,
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase relationship.field }}?: {{ relationship.aggregate }}Dto;

{{else ~}}
    @ApiProperty({
        type       : () => {{ relationship.aggregate }}Dto,
        description: '{{ toCamelCase originName }} [input here api field description]',
        {{#if example }}
        example    : {{#if hasQuotation }}'{{/if }}{{ example }}{{#if hasQuotation }}'{{/if }},
        {{/if }}
    })
    {{ toCamelCase originName }}{{#if nullable }}?{{/if}}: {{ relationship.aggregate }}Dto;

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
