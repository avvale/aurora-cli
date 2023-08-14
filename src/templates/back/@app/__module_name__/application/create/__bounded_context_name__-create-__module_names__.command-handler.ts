/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'CommandHandler' 'ICommandHandler') path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleNames) 'Command')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleNames) 'Service')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{#each (getValueObjectsProperties schema.aggregateProperties) }}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../importsArray
        (object 
            items=
                (sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase (getNameProperty this)))
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/domain/value-objects')
                oneRowByItem=true
        )
~}}
{{/if}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
@CommandHandler({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Command)
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}CommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Command>
{
    constructor(
        private readonly create{{ toPascalCase schema.moduleNames }}Service: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.create{{ toPascalCase schema.moduleNames }}Service.main(
            command.payload
                .map({{ toCamelCase schema.moduleName }} =>
                {
                    return {
                        {{#each (getCreateCommandHandlerProperties schema.aggregateProperties) }}
                        {{#if (isAllowProperty ../schema.moduleName this) }}
                        {{#if hasTimezone}}
                        {{ toCamelCase (getNameProperty this) }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getNameProperty this) }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                        {{else}}
                        {{ toCamelCase (getNameProperty this) }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getNameProperty this) }}),
                        {{/if}}
                        {{/if}}
                        {{/each}}
                    };
                }),
            command.cQMetadata,
        );
    }
}
