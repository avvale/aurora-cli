{{
    setVar 'importsArray' (
        array
            (object items=(array 'IQueryHandler' 'QueryHandler') path='@nestjs/cqrs')
            (object items=(array 'PaginationResponse') path=config.auroraCorePackage)
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Paginate' (toPascalCase schema.moduleNames) 'Query')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Paginate' (toPascalCase schema.moduleNames) 'Service')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@QueryHandler({{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Query)
export class {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}QueryHandler implements IQueryHandler<{{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Query>
{
    constructor(
        private readonly paginate{{ toPascalCase schema.moduleNames }}Service: {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(query: {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Query): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginate{{ toPascalCase schema.moduleNames }}Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
