{{
    setVar 'importsArray' (
        array
            (object items=(array 'Args' 'Query' 'Resolver') path='@nestjs/graphql')
            (object items=(array 'QueryStatement' 'Timezone') path=config.auroraCorePackage)
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'ByIdHandler') path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName)) path='@api/graphql')
    )
~}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{
    push importsArray
        (object items='ContentLanguage' path=config.auroraCorePackage)
~}}
{{/if}}
{{#if schema.hasOAuth}}
{{
    push importsArray
        (object items='Auth' path='@aurora/decorators')
~}}
{{/if}}
{{#if schema.hasTenant}}
{{
    push importsArray
        (object items='AccountResponse' path=(sumStrings config.appContainer '/iam/account'))
        (object items='TenantPolicy' path=(sumStrings config.appContainer '/iam/shared'))
        (object items='CurrentAccount' path=config.auroraCorePackage)
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Resolver()
{{#if schema.hasOAuth}}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.get')
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdResolver
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler,
    ) {}

    @Query('{{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById')
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        {{#each (getPrimaryKeyProperties schema.aggregateProperties) }}
        @Args('{{ toCamelCase (getPropertyName this) }}') {{ toCamelCase (getPropertyName this) }}: {{ getPropertyJavascriptType this ../config }},
        {{/each}}
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        {{#if (hasI18nProperties schema.aggregateProperties) }}
        @ContentLanguage() contentLanguage?: string,
        {{/if}}
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}>
    {
        return await this.handler.main(
            {{#each (getPrimaryKeyProperties schema.aggregateProperties) }}
            {{ toCamelCase (getPropertyName this) }},
            {{/each}}
            {{#if schema.hasTenant}}
            account,
            {{/if}}
            constraint,
            timezone,
            {{#if (hasI18nProperties schema.aggregateProperties) }}
            contentLanguage,
            {{/if}}
        );
    }
}
