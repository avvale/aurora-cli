import { Injectable } from '@nestjs/common';
import { {{#if schema.properties.hasI18n}}AddI18nConstraintService, {{/if}}IQueryBus, QueryStatement } from '{{ config.auroraCorePackage }}';
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '{{ config.appContainer }}/iam/account/domain/account.response';
{{/if}}

// {{ config.appContainer }}
import { Find{{ toPascalCase schema.moduleName }}ByIdQuery } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/find/find-{{ toKebabCase schema.moduleName }}-by-id.query';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} } from '@api/graphql';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto } from '../dto';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        {{#if schema.properties.hasI18n}}
        private readonly addI18nConstraintService: AddI18nConstraintService,
        {{/if}}
    ) {}

    async main(
        id: string,
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
        constraint?: QueryStatement,
        timezone?: string,
        {{#if schema.properties.hasI18n}}
        contentLanguage?: string,
        {{/if}}
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} | {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto>
    {
        {{#if schema.properties.hasI18n}}
        constraint = await this.addI18nConstraintService.main(
            constraint,
            '{{ toCamelCase schema.moduleName }}I18n',
            contentLanguage,
        );

        {{/if}}
        return await this.queryBus.ask(new Find{{ toPascalCase schema.moduleName }}ByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}