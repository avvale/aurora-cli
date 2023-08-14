/* eslint-disable @typescript-eslint/explicit-function-return-type */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Body' 'Controller' 'Param' 'Delete')  path='@nestjs/common')
            (object items=(array 'ApiTags' 'ApiOkResponse' 'ApiOperation')  path='@nestjs/swagger')
            (object items=(array 'QueryStatement' 'Timezone')  path=config.auroraCorePackage)
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Dto')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Delete' (toPascalCase schema.moduleName) 'ByIdHandler')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)) 
            )
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
@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/delete')
{{#if schema.hasOAuth}}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.delete')
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdController
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete {{ toKebabCase schema.moduleName }} by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto })
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        @Param('id') id: string,
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        {{#if (hasI18nProperties schema.aggregateProperties) }}
        @ContentLanguage() contentLanguage?: string,
        {{/if}}
        {{#if schema.hasAuditing}}
        @Auditing() auditing?: AuditingMeta,
        {{/if}}
    )
    {
        return await this.handler.main(
            id,
            {{#if schema.hasTenant}}
            account,
            {{/if}}
            constraint,
            timezone,
            {{#if (hasI18nProperties schema.aggregateProperties) }}
            contentLanguage,
            {{/if}}
            {{#if schema.hasAuditing}}
            auditing,
            {{/if}}
        );
    }
}
