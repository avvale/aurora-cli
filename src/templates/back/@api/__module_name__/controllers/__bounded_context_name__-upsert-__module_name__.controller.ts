/* eslint-disable @typescript-eslint/explicit-function-return-type */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Body' 'Controller' 'Post') path='@nestjs/common')
            (object items=(array 'ApiCreatedResponse' 'ApiOperation' 'ApiTags') path='@nestjs/swagger')
            (object items=(array 'Auditing' 'AuditingMeta' 'Timezone') path=config.auroraCorePackage)
            (object items=(array (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Dto') (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdDto')) path='../dto')
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Upsert' (toPascalCase schema.moduleName) 'Handler') path=(sumStrings '../handlers/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.handler'))
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
@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/upsert')
{{#if schema.hasOAuth}}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.upsert')
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Controller
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert {{ toKebabCase schema.moduleName }}' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto })
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        @Body() payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto,
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
    )
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