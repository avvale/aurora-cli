/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'CommandHandler' 'ICommandHandler') path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdCommand')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdService')
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
                path=(sumStrings ../config.appContainer '/' (toKebabCase ../schema.boundedContextName) '/' (toKebabCase ../schema.moduleName) '/domain/value-objects')
                oneRowByItem=true
        )
~}}
{{/if}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
@CommandHandler({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand)
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand>
{
    constructor(
        private readonly update{{ toPascalCase schema.moduleName }}ByIdService: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.update{{ toPascalCase schema.moduleName }}ByIdService.main(
            {
                {{#each schema.aggregateProperties.updateCommandHandler}}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase (getNameProperty this) }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }}(command.payload.{{ toCamelCase (getNameProperty this) }}, { {{~#unless nullable}}{{#unlessEq (getNameProperty this) 'id'}} undefinable: true {{/unlessEq}}{{/unless~}} }, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
                {{ toCamelCase (getNameProperty this) }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }}(command.payload.{{ toCamelCase (getNameProperty this) }}{{#unless nullable}}{{#unlessEq (getNameProperty this) 'id'}}, { undefinable: true }{{/unlessEq}}{{/unless}}),
                {{/unless}}
                {{/if}}
                {{/if}}
                {{/each}}
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
