{{ setVar 'exportsArray' (array) ~}}
{{#each schema.aggregateProperties.valueObjects}}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../exportsArray
        (
            object
                items=(sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase (getNameProperty this)))
                path=(sumStrings './' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '-' (toKebabCase name))
        )
~}}
{{/if}}
{{/each}}
{{#each schema.aggregateProperties.withRelationshipManyToMany}}
{{
    push ../exportsArray
        (
            object
                items=(sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (toPascalCase ../schema.moduleName) (toPascalCase ../schema.moduleName) 'Id')
                path=(sumStrings './' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '-' (toKebabCase schema.moduleName) '-' (toKebabCase schema.moduleName) '-id')
        )
        (
            object
                items=(sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (toPascalCase ../schema.moduleName) (toPascalCase relationship.singularName) 'Id')
                path=(sumStrings './' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '-' (toKebabCase schema.moduleName) '-' (toKebabCase relationship.singularName) '-id')
        )
~}}
{{/each}}
{{{ importManager (object imports=exportsArray commandType='export') }}}