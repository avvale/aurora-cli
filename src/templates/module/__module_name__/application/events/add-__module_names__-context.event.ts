import { AggregateRoot } from '@nestjs/cqrs';
import { {{ schema.aggregateName }} } from './../../domain/{{ toKebabCase schema.moduleName }}.aggregate';
{{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Created{{ toPascalCase schema.moduleName }}Event } from './created-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleNames) '.event.ts'}}
import { Created{{ toPascalCase schema.moduleNames }}Event } from './created-{{ toKebabCase schema.moduleNames }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Deleted{{ toPascalCase schema.moduleName }}Event } from './deleted-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleNames) '.event.ts'}}
import { Deleted{{ toPascalCase schema.moduleNames }}Event } from './deleted-{{ toKebabCase schema.moduleNames }}.event';
{{/notInArray}}

export class Add{{ toPascalCase schema.moduleNames }}ContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: {{ schema.aggregateName }}[] = [],
    ) {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    {{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event.ts'}}
    {{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleNames) '.event.ts'}}
    created()
    {
        this.apply(
            new Created{{ toPascalCase schema.moduleNames }}Event(
                this.aggregateRoots.map({{ toCamelCase schema.moduleName }} =>
                    new Created{{ toPascalCase schema.moduleName }}Event(
                        {{#each schema.properties.aggregate}}
                        {{#unless isI18n}}
                        {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                        {{/unless}}
                        {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
                        {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                        {{/and}}
                        {{/each}}
                    )
                )
            )
        );
    }
    {{/notInArray}}
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
    {{#notInArray schema.excluded 'src/{{ config.applicationsContainer }}/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleNames) '.event.ts'}}
    deleted()
    {
        this.apply(
            new Deleted{{ toPascalCase schema.moduleNames }}Event(
                this.aggregateRoots.map({{ toCamelCase schema.moduleName }} =>
                    new Deleted{{ toPascalCase schema.moduleName }}Event(
                        {{#each schema.properties.aggregate}}
                        {{#unless isI18n}}
                        {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                        {{/unless}}
                        {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
                        {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                        {{/and}}
                        {{/each}}
                    )
                )
            )
        );
    }
    {{/notInArray}}
    {{/notInArray}}
}