import { Injectable } from '@nestjs/common';
import { {{#if schema.properties.hasI18n}}AddI18NConstraintService, FormatLangCode, {{/if}}ICommandBus, IQueryBus, QueryStatement } from '{{ config.auroraCorePackage }}';

{{#if schema.hasTenant}}
// tenant
import { AccountResponse } from '{{ config.applicationsContainer }}/iam/account/domain/account.response';

{{/if}}
// {{ config.applicationsContainer }}
import { Find{{ toPascalCase schema.moduleName }}ByIdQuery } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/find/find-{{ toKebabCase schema.moduleName }}-by-id.query';
import { Update{{ toPascalCase schema.moduleName }}Command } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/update/update-{{ toKebabCase schema.moduleName }}.command';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}, {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Input } from '../../../../graphql';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto, {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Dto } from '../dto';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        {{#if schema.properties.hasI18n}}
        private readonly addI18NConstraintService: AddI18NConstraintService,
        {{/if}}
    ) {}

    async main(
        payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Input | {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Dto,
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} | {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto>
    {
        await this.commandBus.dispatch(new Update{{ toPascalCase schema.moduleName }}Command(payload, constraint, { timezone }));

        {{#if schema.properties.hasI18n}}
        constraint = await this.addI18NConstraintService.main({}, '{{ toCamelCase schema.moduleName }}I18N', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        {{/if}}
        return await this.queryBus.ask(new Find{{ toPascalCase schema.moduleName }}ByIdQuery(payload.id, constraint, { timezone }));
    }
}