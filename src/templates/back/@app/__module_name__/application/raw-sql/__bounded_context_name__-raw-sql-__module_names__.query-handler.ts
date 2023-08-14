{{
    setVar 'importsArray' (
        array
            (object items=(array 'IQueryHandler' 'QueryHandler') path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Response')
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Mapper')
                        (sumStrings (toPascalCase schema.boundedContextName) 'RawSQL' (toPascalCase schema.moduleNames) 'Query')
                        (sumStrings (toPascalCase schema.boundedContextName) 'RawSQL' (toPascalCase schema.moduleNames) 'Service')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@QueryHandler({{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Query)
export class {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler implements IQueryHandler<{{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Query>
{
    private readonly mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        private readonly rawSQL{{ toPascalCase schema.moduleNames }}Service: {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(query: {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Query): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQL{{ toPascalCase schema.moduleNames }}Service.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
