{{
    setVar 'importsArray' (
        array
            (object items=(array 'Resolver' 'Args' 'Mutation') path='@nestjs/graphql')
            (object items=(array 'Auditing' 'AuditingMeta' 'QueryStatement' 'Timezone') path=config.auroraCorePackage)
            (object items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName)) path='@api/graphql')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleNames) 'Handler')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )      
    )
~}}
{{#if schema.properties.hasI18n}}
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
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.delete')
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Resolver
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Handler,
    ) {}

    @Mutation('{{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}')
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
        {{#if schema.hasAuditing}}
        @Auditing() auditing?: AuditingMeta,
        {{/if}}
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}[]>
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
            {{#if schema.hasAuditing}}
            auditing,
            {{/if}}
        );
    }
}
