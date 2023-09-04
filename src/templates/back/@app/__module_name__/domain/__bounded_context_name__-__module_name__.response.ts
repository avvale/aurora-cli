{{ setVar 'importsArray' (array) ~}}
{{#each (getWithImportRelationshipOneToOneProperties schema.aggregateProperties) }}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
            items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/each}}
{{#each (getWithImportRelationshipManyToOneProperties schema.aggregateProperties) }}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/unless}}
{{/each}}
{{#each (getWithImportRelationshipOneToManyProperties schema.aggregateProperties) }}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
            items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/each}}
{{#each (getWithImportRelationshipManyToManyProperties schema.aggregateProperties) }}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
            items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response
{
    constructor(
        {{#each (getResponseProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this)}}
        public readonly {{ toCamelCase (getPropertyName this) }}: {{ getPropertyJavascriptType this ../config }},
        {{/if}}
        {{/each}}
        {{#each (getWithRelationshipOneToOneWithRelationshipFieldProperties schema.aggregateProperties) }}
        public readonly {{ toCamelCase relationship.field }}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response,
        {{/each}}
        {{#each (getWithRelationshipOneToOneWithoutRelationshipFieldProperties schema.aggregateProperties) }}
        public readonly {{ toCamelCase name }}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response,
        {{/each}}
        {{#each (getWithRelationshipManyToOneProperties schema.aggregateProperties) }}
        {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
        public readonly {{ toCamelCase relationship.field }}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response,
        {{/unless}}
        {{/each}}
        {{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
        public readonly {{ toCamelCase name }}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response[],
        {{/each}}
        {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
        public readonly {{ toCamelCase name }}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response[],
        {{/each}}
    ) {}
}
