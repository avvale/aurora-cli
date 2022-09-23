import { Injectable } from '@nestjs/common';
import { {{#if schema.properties.hasI18n}}AddI18NConstraintService, FormatLangCode, {{/if}}ICommandBus, IQueryBus, QueryStatement, Utils } from '{{ config.auroraCorePackage }}';
{{#if schema.hasAuditing}}

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';
{{/if}}
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '{{ config.applicationsContainer }}/iam/account/domain/account.response';
{{/if}}

// {{ config.applicationsContainer }}
import { Upsert{{ toPascalCase schema.moduleNames }}Command } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/upsert/upsert-{{ toKebabCase schema.moduleNames }}.command';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}, {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput } from 'src/graphql';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto, {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto } from '../dto';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleNames }}Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        {{#if schema.properties.hasI18n}}
        private readonly addI18NConstraintService: AddI18NConstraintService,
        {{/if}}
    ) {}

    async main(
        payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput[] | {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto[],
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
        constraint?: QueryStatement,
        timezone?: string,
        {{#if schema.hasAuditing}}
        auditing?: AuditingMeta,
        {{/if}}
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new Upsert{{ toPascalCase schema.moduleNames }}Command(
            payload,
            {
                timezone,
                {{#if schema.hasAuditing}}
                repositoryOptions: {
                    auditing,
                },
                {{/if}}
            },
        ));
        {{#if schema.properties.hasI18n}}

        constraint = await this.addI18NConstraintService.main({}, '{{ toCamelCase schema.moduleName }}I18N', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        {{/if}}

        return true;
    }
}