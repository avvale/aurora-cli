/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body{{#if schema.hasOAuth}}, UseGuards{{/if}} } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { {{#if schema.properties.hasI18n}}FormatLangCode, {{/if}}QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto, {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto } from '../dto';
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
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleNames }}.handler';

@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/upsert')
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Controller
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Upsert {{ toKebabCase schema.moduleName }} by id' })
    @ApiOkResponse({ description: 'The record has been successfully upserted.', type: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto })
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        @Body() payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto[],
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        {{#if schema.hasAuditing}}
        @Auditing() auditing?: AuditingMeta,
        {{/if}}
    )
    {
        return await this.handler.main(
            payload,
            {{#if schema.hasTenant}}
            account,
            {{/if}}
            constraint,
            timezone,
            {{#if schema.hasAuditing}}
            auditing,
            {{/if}}
        );
    }
}