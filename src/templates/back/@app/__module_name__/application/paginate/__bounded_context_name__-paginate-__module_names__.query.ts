{{
    setVar 'importsArray' (
        array
            (object items=(array 'QueryStatement' 'CQMetadata') path=config.auroraCorePackage)
    )
~}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Query
{
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
