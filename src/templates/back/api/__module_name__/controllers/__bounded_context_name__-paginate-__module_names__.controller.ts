/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post{{#if schema.hasOAuth}}, UseGuards{{/if}} } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Constraint, {{#if schema.properties.hasI18n}}ContentLanguage, {{/if}}Pagination, QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';

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
import { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.handler';

@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleNames }}/paginate')
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Controller
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate {{ toKebabCase schema.moduleNames }}' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        {{#if schema.properties.hasI18n}}
        @ContentLanguage() contentLanguage?: string,
        {{/if}}
    )
    {
        return await this.handler.main(
            {{#if schema.hasTenant}}
            account,
            {{/if}}
            queryStatement,
            constraint,
            timezone,
            {{#if schema.properties.hasI18n}}
            contentLanguage?: string,
            {{/if}}
        );
    }
}