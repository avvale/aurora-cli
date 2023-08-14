{{
    setVar 'importsArray' (
        array
            (object items=(array 'CommandHandler' 'ICommandHandler') path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleNames) 'Command')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleNames) 'Service')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@CommandHandler({{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Command)
export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}CommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Command>
{
    constructor(
        private readonly delete{{ toPascalCase schema.moduleNames }}Service: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.delete{{ toPascalCase schema.moduleNames }}Service.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
