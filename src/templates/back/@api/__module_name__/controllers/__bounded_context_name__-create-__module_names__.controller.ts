/* eslint-disable @typescript-eslint/explicit-function-return-type */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Body' 'Controller' 'Post')  path='@nestjs/common')
            (object items=(array 'ApiTags' 'ApiCreatedResponse' 'ApiBody' 'ApiOperation')  path='@nestjs/swagger')
            (object items=(array 'Auditing' 'AuditingMeta' 'Timezone')  path=config.auroraCorePackage)
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Dto')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Dto')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleNames) 'Handler')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )    
    )
~}}
{{#if schema.hasTenant}}
{{   
    push importsArray
        (object items='AccountResponse' path=(sumStrings config.appContainer '/iam/account'))
        (object items='TenantPolicy' path=(sumStrings config.appContainer '/iam/shared'))
        (object items='CurrentAccount' path=config.auroraCorePackage)
~}}
{{/if}}
{{#if schema.hasOAuth}}
{{ 
    push importsArray
        (object items='Auth' path='@aurora/decorators')
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleNames }}/create')
{{#if schema.hasOAuth}}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.create')
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create {{ toKebabCase schema.moduleNames }} in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto]})
    @ApiBody({ type: [{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto]})
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        @Body() payload: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto[],
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Timezone() timezone?: string,
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
            {{#if schema.hasAuditing}}
            auditing,
            {{/if}}
        );
    }
}
