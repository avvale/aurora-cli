/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto } from '../dto';
{{else}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto } from '../dto';
{{/eq }}
{{#if schema.hasOAuth}}
import { Auth } from '@aurora/decorators';
{{/if}}
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '{{ config.appContainer }}/iam/account/domain/account.response';
import { TenantPolicy } from '{{ config.appContainer }}/iam/shared/domain/decorators/tenant-policy.decorator';
import { CurrentAccount } from '../../../shared/decorators/current-account.decorator';
{{/if}}

// {{ config.appContainer }}
import { {{ getClassNameAdditionalApi currentAdditionalApi }}Handler } from '../handlers/{{ currentAdditionalApi.getApiFileName }}.handler';

@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ currentAdditionalApi.path }}')
{{#if schema.hasOAuth}}
{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.get')
{{else}}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.update')
{{/eq }}
{{/if}}
export class {{ getClassNameAdditionalApi currentAdditionalApi }}Controller
{
    constructor(
        private readonly handler: {{ getClassNameAdditionalApi currentAdditionalApi }}Handler,
    ) {}

    @{{ toPascalCase currentAdditionalApi.httpMethod }}()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: {{#eq currentAdditionalApi.resolverType resolverType.QUERY }}[{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto]{{else}}Boolean {{/eq~}} })
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        {{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        {{else}}
        @Body() payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        {{/eq }}
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
            {{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
            queryStatement,
            constraint,
            {{else}}
            payload,
            constraint,
            {{/eq }}
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