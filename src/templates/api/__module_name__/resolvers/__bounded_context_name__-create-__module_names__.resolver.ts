/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from '{{ config.auroraCorePackage }}';

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
import { Create{{ toPascalCase schema.moduleNames }}Command } from '../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/create/create-{{ toKebabCase schema.moduleNames }}.command';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input } from './../../../../graphql';

@Resolver()
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('{{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}')
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Args('payload') payload: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new Create{{ toPascalCase schema.moduleNames }}Command(payload, { timezone }));
        return true;
    }
}