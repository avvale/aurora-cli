{{
    setVar 'importsArray' (
        array
            (object items=(array 'Resolver' 'Args' 'Mutation') path='@nestjs/graphql')
            (object items=(array 'Timezone') path=config.auroraCorePackage)
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Input') path='@api/graphql')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleNames) 'Handler')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{#if schema.hasOAuth}}
{{
    push importsArray
        (object items='Auth' path='@aurora/decorators')
~}}
{{/if}}
{{#if schema.hasAuditing}}
{{
    push importsArray
        (object items=(array 'Auditing' 'AuditingMeta') path=config.auroraCorePackage)
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
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.create')
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler,
    ) {}

    @Mutation('{{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}')
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        @Args('payload') payload: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input[],
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Timezone() timezone?: string,
        {{#if schema.hasAuditing}}
        @Auditing() auditing?: AuditingMeta,
        {{/if}}
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            {{#if schema.hasTenant}}
            account,
            {{/if}}
            timezone,
            {{#if schema.hasAuditing}}
            auditing,
            {{/if}}
        );
    }
}
