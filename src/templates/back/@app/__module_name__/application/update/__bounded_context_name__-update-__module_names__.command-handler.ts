/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'CommandHandler' 'ICommandHandler') path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleNames) 'Command')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleNames) 'Service')
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
@CommandHandler({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Command)
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}CommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Command>
{
    constructor(
        private readonly update{{ toPascalCase schema.moduleNames }}Service: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.update{{ toPascalCase schema.moduleNames }}Service.main(
            {
                {{#each schema.aggregateProperties.updateCommandHandler}}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase (getNameProperty this) }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase (getNameProperty this) }}, { {{~#unless nullable}} undefinable: true {{/unless~}} }, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
                {{ toCamelCase (getNameProperty this) }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase (getNameProperty this) }}{{#unless nullable}}, { undefinable: true }{{/unless}}),
                {{/unless}}
                {{/if}}
                {{/if}}
                {{/each}}
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
