{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items=(array 'QueryStatement' 'CQMetadata') path=config.auroraCorePackage)
            (object items=(sumStrings 'I' (toPascalCase schema.moduleName) 'Repository') path=(sumStrings '../../domain/' toKebabCase schema.moduleName '.repository'))
            (object items=schema.aggregateName path=(sumStrings '../../domain/' toKebabCase schema.moduleName '.aggregate'))
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class Find{{ toPascalCase schema.moduleName }}Service
{
    constructor(
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<{{ schema.aggregateName }}>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}