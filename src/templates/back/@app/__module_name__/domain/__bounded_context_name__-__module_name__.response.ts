{{ setVar 'importsArray' (array) ~}}
{{#each (getWithImportRelationshipOneToOneProperties schema.aggregateProperties) }}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty) 'Response')
                path=(ternary relationship.packageName relationship.packageName (sumStrings ../config.appContainer '/' relationship.modulePath))
        )
~}}
{{/each}}
{{#each (getWithImportRelationshipManyToOneProperties schema.aggregateProperties) }}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty) 'Response')
                path=(ternary relationship.packageName relationship.packageName (sumStrings ../config.appContainer '/' relationship.modulePath))
        )
~}}
{{/unless}}
{{/each}}
{{#each (getWithImportRelationshipOneToManyProperties schema.aggregateProperties) }}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty) 'Response')
                path=(ternary relationship.packageName relationship.packageName (sumStrings ../config.appContainer '/' relationship.modulePath))
        )
~}}
{{/each}}
{{#each (getWithImportRelationshipManyToManyProperties schema.aggregateProperties) }}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty) 'Response')
                path=(ternary relationship.packageName relationship.packageName (sumStrings ../config.appContainer '/' relationship.modulePath))
        )
~}}
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
