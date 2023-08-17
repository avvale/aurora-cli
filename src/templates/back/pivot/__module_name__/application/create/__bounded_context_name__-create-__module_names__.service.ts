{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items='EventPublisher' path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        currentProperty.relationship.pivot.aggregate
                        (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) (toPascalCase currentProperty.relationship.singularName) 'Repository')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
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
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.name }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Repository,
    ) {}

    public async main(
        {{ toCamelCase schema.moduleNames }}{{ toPascalCase currentProperty.name }}: {
            {{ toCamelCase schema.moduleName }}Id: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}Id;
            {{ toCamelCase currentProperty.relationship.singularName }}Id: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Id;

        } [],
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregate{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.name }} = {{ toCamelCase schema.moduleNames }}{{ toPascalCase currentProperty.name }}.map({{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }} => {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}.register(
            {{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}.{{ toCamelCase schema.moduleName }}Id,
            {{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}.{{ toCamelCase currentProperty.relationship.singularName }}Id,
        ));

        // insert
        await this.repository.insert(aggregate{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.name }});
    }
}