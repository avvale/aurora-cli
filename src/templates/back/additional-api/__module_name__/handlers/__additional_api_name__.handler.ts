import { Injectable } from '@nestjs/common';
import { {{#if schema.properties.hasI18n}}AddI18NConstraintService, FormatLangCode, {{/if}}ICommandBus, IQueryBus, QueryStatement } from '{{ config.auroraCorePackage }}';
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '{{ config.applicationsContainer }}/iam/account/domain/account.response';

{{/if}}

// {{ config.applicationsContainer }}
{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} } from '../../../../graphql';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto } from '../dto';
{{else}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput } from '../../../../graphql';
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto } from '../dto';
{{/eq }}

@Injectable()
export class {{ currentAdditionalApi.getClassName }}Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        {{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        {{else}}
        payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput | {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto,
        constraint?: QueryStatement,
        {{/eq }}
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
        timezone?: string,
    ): Promise<{{#eq currentAdditionalApi.resolverType resolverType.QUERY }}{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}[] | {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto[]{{else}}boolean{{/eq }}>
    {
        // coding here
        // await this.commandBus.dispatch(new YourCommand(payload, { timezone }));
        // await this.queryBus.ask(new YourQuery(queryStatement, constraint, { timezone }));

        {{#eq currentAdditionalApi.resolverType resolverType.QUERY }}
        return [];
        {{else}}
        return true;
        {{/eq }}
    }
}