/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { Body, Controller, Param, Delete } from '@nestjs/common';
// import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
// import { Auditing, AuditingMeta, {{#if schema.properties.hasI18n}}ContentLanguage, {{/if}}QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
// import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto } from '../dto';
// {{#if schema.hasOAuth}}
// import { Auth } from '@aurora/decorators';
// {{/if}}
// {{#if schema.hasTenant}}

// tenant
// import { AccountResponse } from '{{ config.appContainer }}/iam/account/domain/account.response';
// import { TenantConstraint } from '{{ config.appContainer }}/iam/shared/domain/decorators/tenant-constraint.decorator';
// import { CurrentAccount } from '../../../shared/decorators/current-account.decorator';
// {{/if}}

// {{ config.appContainer }}
// import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdHandler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.handler';
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Body' 'Controller' 'Param' 'Delete')  path='@nestjs/common')
            (object items=(array 'ApiTags' 'ApiOkResponse' 'ApiOperation')  path='@nestjs/swagger')
            (object items=(array 'Auditing' 'AuditingMeta' 'Timezone' 'QueryStatement')  path=config.auroraCorePackage)
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
        {{#if schema.properties.hasI18n}}
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
            {{#if schema.properties.hasI18n}}
            contentLanguage,
            {{/if}}
            {{#if schema.hasAuditing}}
            auditing,
            {{/if}}
        );
    }
}