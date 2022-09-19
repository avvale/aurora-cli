{{#if schema.hasOAuth}}
import { UseGuards } from '@nestjs/common';
{{/if}}
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { {{#if schema.properties.hasI18n}}ContentLanguage, {{/if}}QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
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
import { TenantConstraint } from '{{ config.applicationsContainer }}/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from '../../../shared/decorators/current-account.decorator';
{{/if}}

// {{ config.applicationsContainer }}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdHandler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.handler';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} } from 'src/graphql';

@Resolver()
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdHandler,
    ) {}

    @Mutation('{{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById')
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        @Args('id') id: string,
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        {{#if schema.properties.hasI18n}}
        @ContentLanguage() contentLanguage?: string,
        {{/if}}
        {{#if schema.hasAuditing}}
        @Auditing() auditing?: AuditingMeta,
        {{/if}}
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}>
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