{{
    setVar 'importsArray' (
        array
            (object items=(array 'CommandHandler' 'ICommandHandler') path='@nestjs/cqrs')
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleNames) (toPascalCase currentProperty.originName) 'Command') path=(sumStrings './' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '-' (toKebabCase currentProperty.originName) '.command'))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleNames) (toPascalCase currentProperty.originName) 'Service') path=(sumStrings './' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '-' (toKebabCase currentProperty.originName) '.service'))
            (
                object items=
                (
                        array
                            (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase schema.moduleName) (toPascalCase schema.moduleName) 'Id')
                            (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase schema.moduleName) (toPascalCase currentProperty.relationship.singularName) 'Id')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/domain/value-objects')
                oneRowByItem=true
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@CommandHandler({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}Command)
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}CommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}Command>
{
    constructor(
        private readonly create{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}Service: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}Service,
    ) { }

    async execute(command: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.create{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}Service.main(
            command.{{ toCamelCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}
                .map(data =>
                {
                    return {
                        {{ toCamelCase schema.moduleName }}Id: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}Id(data.{{ toCamelCase schema.moduleName }}Id),
                        {{ toCamelCase currentProperty.relationship.singularName }}Id: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName  }}Id(data.{{ toCamelCase currentProperty.relationship.singularName }}Id),
                    };
                }),
        );
    }
}