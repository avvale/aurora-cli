{{
    setVar 'importsArray' (
        array
            (object items=(array 'Args' 'Mutation' 'Resolver') path='@nestjs/graphql')
            (object items=(array 'Auditing' 'AuditingMeta' 'Timezone') path=config.auroraCorePackage)
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Upsert' (toPascalCase schema.moduleName) 'Handler') path=(sumStrings '../handlers/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.handler'))
            (object items=(array (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName)) (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdInput')) path='@api/graphql')
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items='ContentLanguage' path=config.auroraCorePackage)
~}}
{{/if}}
{{#if schema.hasOAuth}}
{{ push importsArray
    (object items='Auth' path='@aurora/decorators')
~}}
{{/if}}
{{#if schema.hasTenant}}
{{ push importsArray
    (object items='AccountResponse' path=(sumStrings config.appContainer '/iam/account/domain/account.response'))
    (object items='TenantPolicy' path=(sumStrings config.appContainer '/iam/shared/domain/decorators/tenant-policy.decorator'))
    (object items='CurrentAccount' path='../../../shared/decorators/current-account.decorator')
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Resolver()
{{#if schema.hasOAuth}}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.upsert')
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Resolver
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Handler,
    ) {}

    @Mutation('{{ toCamelCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}')
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        @Args('payload') payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput,
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Timezone() timezone?: string,
        {{#if schema.properties.hasI18n}}
        @ContentLanguage() contentLanguage?: string,
        {{/if}}
        {{#if schema.hasAuditing}}
        @Auditing() auditing?: AuditingMeta,
        {{/if}}
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}>
    {
        return await this.handler.main(
            payload,
            {{#if schema.hasTenant}}
            account,
            {{/if}}
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