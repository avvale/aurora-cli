import { Controller, Post, Body{{#if schema.hasOAuth}}, UseGuards{{/if}} } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '{{ config.auroraCorePackage }}';
import { Create{{ toPascalCase schema.moduleName }}Dto } from './../dto/create-{{ toKebabCase schema.moduleName }}.dto';
import { {{ toPascalCase schema.moduleName }}Dto } from './../dto/{{ toKebabCase schema.moduleName }}.dto';

{{#if schema.hasOAuth}}
// authorization
import { Permissions } from '{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/guards/authorization.guard';

{{/if}}
{{#if schema.hasTenant}}
// tenant
import { AccountResponse } from '{{ config.applicationsContainer }}/iam/account/domain/account.response';
import { TenantPolicy } from '{{ config.applicationsContainer }}/iam/shared/domain/decorators/tenant-policy.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

{{/if}}
// {{ config.applicationsContainer }}
import { ICommandBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/command-bus';
import { IQueryBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/query-bus';
import { Find{{ toPascalCase schema.moduleName }}ByIdQuery } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/find/find-{{ toKebabCase schema.moduleName }}-by-id.query';
import { Create{{ toPascalCase schema.moduleName }}Command } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/create/create-{{ toKebabCase schema.moduleName }}.command';

@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}')
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create {{ toKebabCase schema.moduleName }}' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: {{ toPascalCase schema.moduleName }}Dto })
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Body() payload: Create{{ toPascalCase schema.moduleName }}Dto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new Create{{ toPascalCase schema.moduleName }}Command(payload, { timezone }));

        return await this.queryBus.ask(new Find{{ toPascalCase schema.moduleName }}ByIdQuery(payload.id, {}, { timezone }));
    }
}