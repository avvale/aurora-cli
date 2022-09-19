{{#if schema.hasOAuth}}
import { UseGuards } from '@nestjs/common';
{{/if}}
import { Resolver, Args{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}, Query{{else}}, Mutation{{/eq }} } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
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
{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} } from 'src/graphql';
{{else}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput } from 'src/graphql';
{{/eq }}

@Resolver()
{{#if schema.hasOAuth}}
{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.get')
{{else}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.update')
{{/eq }}
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ currentAdditionalApi.getClassName }}Resolver
{
    constructor(
        private readonly handler: {{ currentAdditionalApi.getClassName }}Handler,
    ) {}

    @{{ toPascalCase currentAdditionalApi.resolverType }}('{{ currentAdditionalApi.getResolverName }}')
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        {{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        {{else}}
        @Args('payload') payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        {{/eq }}
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Timezone() timezone?: string,
        {{#if schema.hasAuditing}}
        @Auditing() auditing?: AuditingMeta,
        {{/if}}
    ): Promise<{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}[]{{else}}boolean{{/eq }}>
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