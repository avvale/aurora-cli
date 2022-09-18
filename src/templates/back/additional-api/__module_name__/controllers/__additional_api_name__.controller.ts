/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post{{#if schema.hasOAuth}}, UseGuards{{/if}} } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto } from '../dto';
{{else}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto } from '../dto';
{{/eq }}
{{#if schema.hasAuditing}}

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';
{{/if}}
{{#if schema.hasOAuth}}

// authorization
import { Permissions } from '{{ config.apiContainer }}/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '{{ config.apiContainer }}/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '{{ config.apiContainer }}/iam/shared/guards/authorization.guard';
{{/if}}
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '{{ config.applicationsContainer }}/iam/account/domain/account.response';
import { TenantPolicy } from '{{ config.applicationsContainer }}/iam/shared/domain/decorators/tenant-policy.decorator';
import { CurrentAccount } from '../../../shared/decorators/current-account.decorator';
{{/if}}

// {{ config.applicationsContainer }}
import { {{ currentAdditionalApi.getClassName }}Handler } from '../handlers/{{ currentAdditionalApi.getApiFileName }}.handler';

@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ currentAdditionalApi.path }}')
{{#if schema.hasOAuth}}
{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.get')
{{else}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.update')
{{/eq }}
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ currentAdditionalApi.getClassName }}Controller
{
    constructor(
        private readonly handler: {{ currentAdditionalApi.getClassName }}Handler,
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