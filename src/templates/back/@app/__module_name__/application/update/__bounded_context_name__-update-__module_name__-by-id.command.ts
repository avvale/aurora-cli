{{
    setVar 'importsArray' (
        array
            (object items=(array 'QueryStatement' 'CQMetadata') path=config.auroraCorePackage)
    )
~}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand
{
    constructor(
        public readonly payload: {
            {{#each schema.aggregateProperties.updateCommand}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getNameProperty this) }}{{#unlessEq (getNameProperty this) 'id'}}?{{/unlessEq}}: {{ getJavascriptTypeProperty this }};
            {{/if}}
            {{/each}}
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
