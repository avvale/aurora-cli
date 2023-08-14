/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'CommandHandler' 'ICommandHandler') path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Command')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Service')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{#each schema.properties.valueObjects}}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../importsArray
        (object 
            items=
                (sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase name))
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/domain/value-objects')
                oneRowByItem=true
        )
~}}
{{/if}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
@CommandHandler({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command)
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}CommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command>
{
    constructor(
        private readonly create{{ toPascalCase schema.moduleName }}Service: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Service,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.create{{ toPascalCase schema.moduleName }}Service.main(
            {
                {{#each schema.properties.createCommandHandler}}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18nAvailableLangsProperty . ../schema.properties)}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}),
                {{/unless}}
                {{/if}}
                {{/if}}
                {{/each}}
            },
            command.cQMetadata,
        );
    }
}
