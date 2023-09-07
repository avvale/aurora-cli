{{ setVar 'exportsArray' (array) ~}}
{{#each (getValueObjectsProperties schema.aggregateProperties) }}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../exportsArray
        (
            object
                items=(sumStrings ../schema.aggregateName (addI18nPropertySignature this) (toPascalCase (getPropertyName this)))
                path=(sumStrings './' (toKebabCase ../schema.boundedContextName) '-' (toKebabCase ../schema.moduleName) '-' (addI18nPropertySignature this true) (toKebabCase (getPropertyName this)))
        )
~}}
{{/if}}
{{/each}}
{{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
{{
    push ../exportsArray
        (
            object
                items=(sumStrings ../schema.aggregateName (toPascalCase ../schema.moduleName) (toPascalCase ../schema.moduleName) 'Id')
                path=(sumStrings './' (toKebabCase ../schema.boundedContextName) '-' (toKebabCase ../schema.moduleName) '-' (toKebabCase ../schema.moduleName) '-' (toKebabCase ../schema.moduleName) '-id')
        )
        (
            object
                items=(sumStrings ../schema.aggregateName (toPascalCase ../schema.moduleName) (toPascalCase relationship.singularName) 'Id')
                path=(sumStrings './' (toKebabCase ../schema.boundedContextName) '-' (toKebabCase ../schema.moduleName) '-' (toKebabCase ../schema.moduleName) '-' (toKebabCase relationship.singularName) '-id')
        )
~}}
{{/each}}
{{{ importManager (object imports=exportsArray commandType='export') }}}