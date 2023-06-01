import { Injectable } from '@nestjs/common';
import { {{#if schema.properties.hasI18n}}AddI18nConstraintService, {{/if}}IQueryBus, QueryStatement } from '{{ config.auroraCorePackage }}';
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '{{ config.appContainer }}/iam/account/domain/account.response';
{{/if}}

// {{ config.appContainer }}
import { Paginate{{ toPascalCase schema.moduleNames }}Query } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/paginate/paginate-{{ toKebabCase schema.moduleNames }}.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
        {{#if schema.properties.hasI18n}}
        private readonly addI18nConstraintService: AddI18nConstraintService,
        {{/if}}
    ) {}

    async main(
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        {{#if schema.properties.hasI18n}}
        contentLanguage?: string,
        {{/if}}
    ): Promise<Pagination>
    {
        {{#if schema.properties.hasI18n}}
        constraint = await this.addI18nConstraintService.main(constraint, '{{ toCamelCase schema.moduleName }}I18n', contentLanguage);
        {{/if}}
        return await this.queryBus.ask(new Paginate{{ toPascalCase schema.moduleNames }}Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}