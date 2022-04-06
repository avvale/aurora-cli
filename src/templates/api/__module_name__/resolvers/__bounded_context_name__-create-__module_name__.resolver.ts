/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '{{ config.auroraCorePackage }}';

{{#if schema.hasOAuth}}
// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/guards/authorization.guard';

{{/if}}
{{#if schema.hasTenant}}
// tenant
import { AccountResponse } from '../../../../{{ config.applicationsContainer }}/iam/account/domain/account.response';
import { TenantPolicy } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/decorators/tenant-policy.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

{{/if}}
// {{ config.applicationsContainer }}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.handler';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input } from './../../../../graphql';

@Resolver()
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Resolver
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler,
    ) {}

    @Mutation('{{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}')
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        @Args('payload') payload: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input,
        @Timezone() timezone?: string,
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            {{#if schema.hasTenant}}
            account,
            {{/if}}
        );
    }
}