import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';

{{#if schema.hasOAuth}}
// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/guards/authorization.guard';

{{/if}}
{{#if schema.hasTenant}}
// tenant
import { AccountResponse } from '{{ config.applicationsContainer }}/iam/account/domain/account.response';
import { TenantConstraint } from '{{ config.applicationsContainer }}/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

{{/if}}
// {{ config.applicationsContainer }}
import { ICommandBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/command-bus';
import { IQueryBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/query-bus';
import { Update{{ toPascalCase schema.moduleName }}Command } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/update/update-{{ toKebabCase schema.moduleName }}.command';
import { Find{{ toPascalCase schema.moduleName }}ByIdQuery } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/find/find-{{ toKebabCase schema.moduleName }}-by-id.query';
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Input } from './../../../../graphql';

@Resolver()
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('{{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}')
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Args('payload') payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Input,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new Update{{ toPascalCase schema.moduleName }}Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new Find{{ toPascalCase schema.moduleName }}ByIdQuery(payload.id, constraint, { timezone }));
    }
}