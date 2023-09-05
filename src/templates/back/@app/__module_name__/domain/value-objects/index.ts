{{ setVar 'exportsArray' (array) ~}}
{{#each (getValueObjectsProperties schema.aggregateProperties) }}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../exportsArray
        (
            object
                items=(sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase (getPropertyName this)))
                path=(sumStrings './' (toKebabCase ../schema.boundedContextName) '-' (toKebabCase ../schema.moduleName) '-' (addI18nPropertySignature this true) (toKebabCase (getPropertyName this)))
        )
~}}
{{/if}}
{{/each}}
{{{ importManager (object imports=exportsArray commandType='export') }}}