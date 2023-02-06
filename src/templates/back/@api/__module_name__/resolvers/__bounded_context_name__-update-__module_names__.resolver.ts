{{#if schema.hasOAuth}}
import { UseGuards } from '@nestjs/common';
{{/if}}
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { {{#if schema.hasOAuth}}AuthenticationGuard, AuthorizationGuard, Permissions, {{/if}}QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
{{#if schema.hasAuditing}}

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';
{{/if}}
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '{{ config.appContainer }}/iam/account/domain/account.response';
import { TenantConstraint } from '{{ config.appContainer }}/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from '../../../shared/decorators/current-account.decorator';
{{/if}}

// {{ config.appContainer }}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.handler';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}, {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Input } from '@api/graphql';

@Resolver()
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Resolver
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Handler,
    ) {}

    @Mutation('{{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}')
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        @Args('payload') payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Input,
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
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
            queryStatement,
            constraint,
            timezone,
            {{#if schema.hasAuditing}}
            auditing,
            {{/if}}
        );
    }
}