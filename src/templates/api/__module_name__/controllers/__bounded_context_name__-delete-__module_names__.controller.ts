import { Controller, Delete, Body{{#if schema.hasOAuth}}, UseGuards{{/if}} } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
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
import { TenantConstraint } from '{{ config.applicationsContainer }}/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

{{/if}}
// {{ config.applicationsContainer }}
import { ICommandBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/command-bus';
import { IQueryBus } from '{{ config.auroraLocalPackage }}/cqrs/domain/query-bus';
import { Get{{ toPascalCase schema.moduleNames }}Query } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/get/get-{{ toKebabCase schema.moduleNames }}.query';
import { Delete{{ toPascalCase schema.moduleNames }}Command } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/delete/delete-{{ toKebabCase schema.moduleNames }}.command';

@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleNames }}')
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete {{ toKebabCase schema.moduleNames }} in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [{{ toPascalCase schema.moduleName }}Dto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    {{#if schema.hasTenant}}
    @TenantConstraint()
    {{/if}}
    async main(
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const {{ toCamelCase schema.moduleNames }} = await this.queryBus.ask(new Get{{ toPascalCase schema.moduleNames }}Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new Delete{{ toPascalCase schema.moduleNames }}Command(queryStatement, constraint, { timezone }));

        return {{ toCamelCase schema.moduleNames }};
    }
}