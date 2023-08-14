{{
    setVar 'importsArray' (
        array
            (object items=(array 'Injectable') path='@nestjs/common')
            (object items=(array 'QueryStatement' 'Pagination' 'CQMetadata') path=config.auroraCorePackage)
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository')
                        schema.aggregateName
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<{{ schema.aggregateName }}>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
