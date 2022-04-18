/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body{{#if schema.hasOAuth}}, UseGuards{{/if}} } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, {{#if schema.properties.hasI18n}}FormatLangCode, {{/if}}QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
import { Update{{ toPascalCase schema.moduleName }}Dto } from '../dto/update-{{ toKebabCase schema.moduleName }}.dto';
import { {{ toPascalCase schema.moduleName }}Dto } from '../dto/{{ toKebabCase schema.moduleName }}.dto';

{{#if schema.hasOAuth}}
// authorization
import { Permissions } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/guards/authorization.guard';

{{/if}}
{{#if schema.hasTenant}}
// tenant
import { AccountResponse } from '../../../../{{ config.applicationsContainer }}/iam/account/domain/account.response';
import { TenantConstraint } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from '../../../shared/decorators/current-account.decorator';

{{/if}}
// {{ config.applicationsContainer }}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}.handler';

@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/update')
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Controller
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Handler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update {{ toKebabCase schema.moduleName }}' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: {{ toPascalCase schema.moduleName }}Dto})
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        @Body() payload: Update{{ toPascalCase schema.moduleName }}Dto,
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            {{#if schema.hasTenant}}
            account,
            {{/if}}
            constraint,
            timezone,
        );
    }
}