import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    {{#each schema.properties.valueObjects}}
    {{#unless isI18n}}
    {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
    {{/unless}}
    {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
    {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }},
    {{/and}}
    {{/each}}
} from './../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} } from './../../domain/{{ toKebabCase schema.moduleName }}.aggregate';
import { Add{{ toPascalCase schema.moduleNames }}ContextEvent } from './../events/add-{{ toKebabCase schema.moduleNames }}-context.event';

@Injectable()
export class Create{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
    ) {}

    public async main(
        {{ toCamelCase schema.moduleNames }}: {
            {{#each schema.properties.createService}}
            {{#unless isI18n}}
            {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
            {{/unless}}
            {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
            {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }},
            {{/and}}
            {{/each}}
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregate{{ toPascalCase schema.moduleNames }} = {{ toCamelCase schema.moduleNames }}.map({{ toCamelCase schema.moduleName }} => {{ schema.aggregateName }}.register(
            {{#each schema.properties.valueObjects}}
            {{#unless isI18n}}
            {{#eq name 'createdAt'}}
            new {{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
            {{else eq name 'updatedAt'}}
            new {{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
            {{else eq name 'deletedAt'}}
            null,
            {{else}}
            {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }},
            {{/eq}}
            {{/unless}}
            {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
            {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }},
            {{/and}}
            {{/each}}
        ));

        // insert
        await this.repository.insert(aggregate{{ toPascalCase schema.moduleNames }});

        // create Add{{ toPascalCase schema.moduleNames }}ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const {{ toCamelCase schema.moduleNames }}Registered = this.publisher.mergeObjectContext(new Add{{ toPascalCase schema.moduleNames }}ContextEvent(aggregate{{ toPascalCase schema.moduleNames }}));

        {{ toCamelCase schema.moduleNames }}Registered.created(); // apply event to model events
        {{ toCamelCase schema.moduleNames }}Registered.commit(); // commit all events of model
    }
}