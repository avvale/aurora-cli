import { Injectable } from '@nestjs/common';
import { {{#if schema.properties.hasI18n}}AddI18NConstraintService, {{/if}}IQueryBus, QueryStatement } from '{{ config.auroraCorePackage }}';

{{#if schema.hasTenant}}
// tenant
import { AccountResponse } from '../../../../{{ config.applicationsContainer }}/iam/account/domain/account.response';

{{/if}}
// {{ config.applicationsContainer }}
import { Paginate{{ toPascalCase schema.moduleNames }}Query } from '../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/paginate/paginate-{{ toKebabCase schema.moduleNames }}.query';
import { Pagination } from '../../../../graphql';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
        {{#if schema.properties.hasI18n}}
        private readonly addI18NConstraintService: AddI18NConstraintService,
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
        constraint = await this.addI18NConstraintService.main(constraint, '{{ toCamelCase schema.moduleName }}I18N', contentLanguage);
        {{/if}}
        return await this.queryBus.ask(new Paginate{{ toPascalCase schema.moduleNames }}Query(queryStatement, constraint, { timezone }));
    }
}