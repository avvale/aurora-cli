/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { {{#if schema.properties.hasI18n}}ContentLanguage, {{/if}}QueryStatement, Timezone } from '{{ config.auroraCorePackage }}';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto } from '../dto';
{{#if schema.hasOAuth}}
import { Auth } from '@aurora/decorators';
{{/if}}
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '{{ config.appContainer }}/iam/account/domain/account.response';
import { TenantConstraint } from '{{ config.appContainer }}/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from '../../../shared/decorators/current-account.decorator';
{{/if}}

// {{ config.appContainer }}
import { {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-get-{{ toKebabCase schema.moduleNames }}.handler';

@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleNames }}/get')
{{#if schema.hasOAuth}}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.get')
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Controller
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get {{ toKebabCase schema.moduleNames }} according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto]})
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