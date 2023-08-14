import { Resolver, Args{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}, Query{{else}}, Mutation{{/eq }} } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
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
{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} } from '@api/graphql';
{{else}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput } from '@api/graphql';
{{/eq }}

@Resolver()
{{#if schema.hasOAuth}}
{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.get')
{{else}}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.update')
{{/eq }}
{{/if}}
export class {{ getClassNameAdditionalApi currentAdditionalApi }}Resolver
{
    constructor(
        private readonly handler: {{ getClassNameAdditionalApi currentAdditionalApi }}Handler,
    ) {}

    @{{ toPascalCase currentAdditionalApi.resolverType }}('{{ getResolverNameAdditionalApi currentAdditionalApi }}')
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