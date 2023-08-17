{{
    setVar 'importsArray' (
        array
            (object items=(array 'CommandHandler' 'ICommandHandler') path='@nestjs/cqrs')
            (
                object
                    items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Id')
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/domain/value-objects')
            )
            (
                object
                    items=(sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleName) 'ByIdCommand')
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
            (
                object
                    items=(sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleName) 'ByIdService')
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.service')
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@CommandHandler({{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommand)
export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommand>
{
    constructor(
        private readonly delete{{ toPascalCase schema.moduleName }}ByIdService: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.delete{{ toPascalCase schema.moduleName }}ByIdService.main(
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Id(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
