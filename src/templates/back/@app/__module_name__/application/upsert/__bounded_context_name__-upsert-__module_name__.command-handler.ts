/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'CommandHandler' 'ICommandHandler') path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Upsert' (toPascalCase schema.moduleName) 'Command')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Upsert' (toPascalCase schema.moduleName) 'Service')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{#each (getWithoutTimestampsProperties (getValueObjectsProperties schema.aggregateProperties)) }}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../importsArray
        (object 
            items=
                (sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase (getPropertyName this)))
                path=(sumStrings ../config.appContainer '/' (toKebabCase ../schema.boundedContextName) '/' (toKebabCase ../schema.moduleName) '/domain/value-objects')
                oneRowByItem=true
        )
~}}
{{/if}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
@CommandHandler({{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Command)
export class {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}CommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Command>
{
    constructor(
        private readonly upsert{{ toPascalCase schema.moduleName }}Service: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsert{{ toPascalCase schema.moduleName }}Service.main(
            {
                {{#each (getUpsertCommandHandlerProperties schema.aggregateProperties) }}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{#if (isTimezoneProperty this) }}
                {{ toCamelCase (getPropertyName this) }}: new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getPropertyName this) }}(command.payload.{{ toCamelCase (getPropertyName this) }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
                {{ toCamelCase (getPropertyName this) }}: new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getPropertyName this) }}(command.payload.{{ toCamelCase (getPropertyName this) }}),
                {{/unless}}
                {{/if}}
                {{/if}}
                {{/each}}
            },
            command.cQMetadata,
        );
    }
}
