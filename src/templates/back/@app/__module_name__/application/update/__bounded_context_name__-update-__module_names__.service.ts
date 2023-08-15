import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.repository';
{{> importI18nRepository}}
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toPascalCase schema.boundedContextName }}Add{{ toPascalCase schema.moduleNames }}ContextEvent } from '../events/{{ toKebabCase schema.boundedContextName }}-add-{{ toKebabCase schema.moduleNames }}-context.event';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(
        payload: {
            {{#each (getUpdateServiceProperties schema.aggregateProperties schema.moduleName) }}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getNameProperty this) }}?: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }};
            {{/if}}
            {{/each}}
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        {{#if (hasI18nProperties schema.aggregateProperties) }}
        const contentLanguage = cQMetadata.meta.contentLanguage;

        // override langId value object with header content-language value
        payload.langId = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18nLangId(contentLanguage.id);

        {{/if}}
        // create aggregate with factory pattern
        const {{ toCamelCase schema.moduleName }} = {{ schema.aggregateName }}.register(
            {{#each (getAggregateProperties schema.aggregateProperties) }}
            {{#unless isI18n}}
{{#eq (getNameProperty this) 'createdAt'}}
            null, // createdAt
{{else eq (getNameProperty this) 'updatedAt'}}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq (getNameProperty this) 'deletedAt'}}
            null, // deletedAt
{{else}}
{{#if (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
            null, // availableLangs
{{else}}
            payload.{{ toCamelCase (getNameProperty this) }},
{{/if}}
{{/eq}}
            {{/unless}}
            {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
            payload.{{ toCamelCase (getNameProperty this) }},
            {{/and}}
            {{/each}}
        );

        {{#if (hasI18nProperties schema.aggregateProperties) }}
        // delete availableLangs property to avoid overwrite this value in database
        delete {{ toCamelCase schema.moduleName }}.availableLangs;
        {{/if}}

        // update
        await this.repository.update(
            {{ toCamelCase schema.moduleName }},
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );
        {{#if (hasI18nProperties schema.aggregateProperties) }}

        await this.repositoryI18n.update(
            {{ toCamelCase schema.moduleName }},
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
                dataFactory  : (aggregate: {{ schema.aggregateName }}) => aggregate.toI18nDTO(),
            },
        );
        {{/if}}

        // get objects to delete
        const {{ toCamelCase schema.moduleNames }} = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const {{ toCamelCase schema.moduleNames }}Register = this.publisher.mergeObjectContext(
            new {{ toPascalCase schema.boundedContextName }}Add{{ toPascalCase schema.moduleNames }}ContextEvent({{ toCamelCase schema.moduleNames }}),
        );

        {{ toCamelCase schema.moduleNames }}Register.updated(); // apply event to model events
        {{ toCamelCase schema.moduleNames }}Register.commit(); // commit all events of model
    }
}
