{{
    setVar 'importsArray' (
        array
            (object items=(array 'Resolver' 'Args' 'Query') path='@nestjs/graphql')
            (object items=(array 'QueryStatement' 'Timezone') path=config.auroraCorePackage)
            (object items=(array 'Pagination') path='@api/graphql')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Paginate' (toPascalCase schema.moduleNames) 'Handler')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
    )
~}}
{{#if schema.hasTenant}}
{{ push importsArray
    (object items='AccountResponse' path=(sumStrings config.appContainer '/iam/account'))
    (object items='TenantConstraint' path=(sumStrings config.appContainer '/iam/shared'))
    (object items='CurrentAccount' path=config.auroraCorePackage)
~}}
{{/if}}
{{#if schema.hasOAuth}}
{{ push importsArray
    (object items='Auth' path='@aurora/decorators')
~}}
{{/if}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
(object items=(array 'ContentLanguage') path=config.auroraCorePackage)
~}}
{{/if}}
@Resolver()
{{#if schema.hasOAuth}}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.get')
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler,
    ) {}

    @Query('{{ toCamelCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}')
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        {{#if schema.properties.hasI18n}}
        @ContentLanguage() contentLanguage?: string,
        {{/if}}
    ): Promise<Pagination>
    {
        return await this.handler.main(
            {{#if schema.hasTenant}}
            account,
            {{/if}}
            queryStatement,
            constraint,
            timezone,
            {{#if schema.properties.hasI18n}}
            contentLanguage,
            {{/if}}
        );
    }
}