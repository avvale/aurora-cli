/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { {{#if schema.properties.hasI18n}}AddI18NConstraintService, FormatLangCode, {{/if}}ICommandBus, IQueryBus } from '{{ config.auroraCorePackage }}';
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '../../../../{{ config.applicationsContainer }}/iam/account/domain/account.response';

{{/if}}

// {{ config.applicationsContainer }}
import { Find{{ toPascalCase schema.moduleName }}ByIdQuery } from '../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/find/find-{{ toKebabCase schema.moduleName }}-by-id.query';
import { Create{{ toPascalCase schema.moduleName }}Command } from '../../../../{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/create/create-{{ toKebabCase schema.moduleName }}.command';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input } from '../../../../graphql';
import { Create{{ toPascalCase schema.moduleName }}Dto } from '../dto/create-{{ toKebabCase schema.moduleName }}.dto';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        {{#if schema.properties.hasI18n}}
        private readonly addI18NConstraintService: AddI18NConstraintService,
        {{/if}}
    ) {}

    async main(
        payload: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input | Create{{ toPascalCase schema.moduleName }}Dto,
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
        timezone?: string,
    )
    {
        await this.commandBus.dispatch(new Create{{ toPascalCase schema.moduleName }}Command(payload, { timezone }));

        {{#if schema.properties.hasI18n}}
        const constraint = await this.addI18NConstraintService.main({}, '{{ toCamelCase schema.moduleName }}I18N', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        return await this.queryBus.ask(new Find{{ toPascalCase schema.moduleName }}ByIdQuery(payload.id, constraint, { timezone }));
        {{else}}
        return await this.queryBus.ask(new Find{{ toPascalCase schema.moduleName }}ByIdQuery(payload.id, {}, { timezone }));
        {{/if}}
    }
}