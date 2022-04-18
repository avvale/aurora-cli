/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body{{#if schema.hasOAuth}}, UseGuards{{/if}} } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '{{ config.auroraCorePackage }}';
import { {{ toPascalCase schema.moduleName }}Dto } from '../dto/{{ toKebabCase schema.moduleName }}.dto';
import { Create{{ toPascalCase schema.moduleName }}Dto } from '../dto/create-{{ toKebabCase schema.moduleName }}.dto';

{{#if schema.hasOAuth}}
// authorization
import { Permissions } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/modules/auth/guards/authorization.guard';

{{/if}}
{{#if schema.hasTenant}}
// tenant
import { AccountResponse } from '../../../../{{ config.applicationsContainer }}/iam/account/domain/account.response';
import { TenantPolicy } from '../../../../{{ config.applicationsContainer }}/iam/shared/domain/decorators/tenant-policy.decorator';
import { CurrentAccount } from '../../../shared/decorators/current-account.decorator';

{{/if}}
// {{ config.applicationsContainer }}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.handler';

@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleNames }}/create')
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create {{ toKebabCase schema.moduleNames }} in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [{{ toPascalCase schema.moduleName }}Dto]})
    @ApiBody({ type: [Create{{ toPascalCase schema.moduleName }}Dto]})
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        @Body() payload: Create{{ toPascalCase schema.moduleName }}Dto[],
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            {{#if schema.hasTenant}}
            account,
            {{/if}}
            timezone,
        );
    }
}