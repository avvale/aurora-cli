import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ContentLanguage, QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';

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
import { Find{{ toPascalCase schema.moduleName }}ByIdQuery } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/find/find-{{ toKebabCase schema.moduleName }}-by-id.query';
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommand } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/delete/delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.command';
import { AddI18NConstraintService } from '@apps/common/lang/application/shared/add-i18n-constraint.service';

@Resolver()
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18NResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Mutation('{{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById')
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
    )
    {
        constraint = await this.addI18NConstraintService.main(constraint, '{{ toCamelCase schema.moduleName }}I18N', contentLanguage);
        const {{ toCamelCase schema.moduleName }} = await this.queryBus.ask(new Find{{ toPascalCase schema.moduleName }}ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommand(id, constraint, { timezone }));

        return {{ toCamelCase schema.moduleName }};
    }
}