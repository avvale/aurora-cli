{{
    setVar 'importsArray' (
        array
            (object items=(array 'QueryStatement' 'CQMetadata') path=config.auroraCorePackage)
    )
~}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQuery
{
    constructor(
        {{#each (getPrimaryKeyProperties schema.aggregateProperties) }}
        public readonly {{ toCamelCase (getPropertyName this) }}: {{ getPropertyJavascriptType this ../config }},
        {{/each}}
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
