import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
{{#if schema.properties.hasI18n}}
import { ConfigService } from '@nestjs/config';
{{/if}}
import { CQMetadata } from '@aurora-ts/core';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
{{> importI18NRepository}}
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} } from '../../domain/{{ toKebabCase schema.moduleName }}.aggregate';
import { Add{{ toPascalCase schema.moduleNames }}ContextEvent } from '../events/add-{{ toKebabCase schema.moduleNames }}-context.event';

@Injectable()
export class Create{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18NRepository}}
        {{#if schema.properties.hasI18n}}
        private readonly configService: ConfigService,
        {{/if}}
    ) {}

    async main(
        {{ toCamelCase schema.moduleNames }}: {
            {{#each schema.properties.createItemsService}}
            {{#if (allowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }};
            {{/if}}
            {{/each}}
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregate{{ toPascalCase schema.moduleNames }} = {{ toCamelCase schema.moduleNames }}.map({{ toCamelCase schema.moduleName }} => {{ schema.aggregateName }}.register(
            {{#each schema.properties.aggregate}}
            {{#unless isI18n}}
{{#eq name 'createdAt'}}
            new {{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
{{else eq name 'updatedAt'}}
            new {{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq name 'deletedAt'}}
            null, // deleteAt
{{else}}
            {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }},
{{/eq}}
            {{/unless}}
            {{#and isI18n (allowProperty ../schema.moduleName this)}}
            {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }},
            {{/and}}
            {{/each}}
        ));

        // insert
        {{#if schema.properties.hasI18n}}
        // delete duplicate elements from multiple languages
        await this.repository.insert(aggregate{{ toPascalCase schema.moduleNames }}.filter((country, index, self) => index === self.findIndex(t => t.id.value === country.id.value)), cQMetadata?.repositoryOptions, { insertOptions: cQMetadata?.repositoryOptions });
        await this.repositoryI18n.insert(aggregate{{ toPascalCase schema.moduleNames }}, { dataFactory: aggregate => aggregate.toI18nDTO(), insertOptions: cQMetadata?.repositoryOptions });
        {{else}}
        await this.repository.insert(aggregate{{ toPascalCase schema.moduleNames }}, { insertOptions: cQMetadata?.repositoryOptions });
        {{/if}}

        // create Add{{ toPascalCase schema.moduleNames }}ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const {{ toCamelCase schema.moduleNames }}Registered = this.publisher.mergeObjectContext(new Add{{ toPascalCase schema.moduleNames }}ContextEvent(aggregate{{ toPascalCase schema.moduleNames }}));

        {{ toCamelCase schema.moduleNames }}Registered.created(); // apply event to model events
        {{ toCamelCase schema.moduleNames }}Registered.commit(); // commit all events of model
    }
}