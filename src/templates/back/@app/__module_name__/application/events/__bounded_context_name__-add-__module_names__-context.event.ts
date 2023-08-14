import { AggregateRoot } from '@nestjs/cqrs';
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.aggregate';
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleName) '.event.ts'}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/'(toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleNames) '.event.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event } from './{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleName) '.event.ts'}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleNames) '.event.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}Event } from './{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleNames }}.event';
{{/notInArray}}
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleName) '.event.ts'}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleNames) '.event.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event } from './{{ toKebabCase schema.boundedContextName }}-updated-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleName) '.event.ts'}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleNames) '.event.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event } from './{{ toKebabCase schema.boundedContextName }}-updated-{{ toKebabCase schema.moduleNames }}.event';
{{/notInArray}}
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event } from './{{ toKebabCase schema.boundedContextName }}-deleted-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleNames) '.event.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}Event } from './{{ toKebabCase schema.boundedContextName }}-deleted-{{ toKebabCase schema.moduleNames }}.event';
{{/notInArray}}

export class {{ toPascalCase schema.boundedContextName }}Add{{ toPascalCase schema.moduleNames }}ContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: {{ schema.aggregateName }}[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleName) '.event.ts'}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleNames) '.event.ts'}}
    created(): void
    {
        this.apply(
            new {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}Event(
                this.aggregateRoots.map({{ toCamelCase schema.moduleName }} =>
                    new {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event(
                        {{#each schema.properties.aggregate}}
                        {{#if (isAllowProperty ../schema.moduleName this) }}
                        {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                        {{/if}}
                        {{/each}}
                    ),
                ),
            ),
        );
    }
    {{/notInArray}}
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleName) '.event.ts'}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleNames) '.event.ts'}}
    updated(): void
    {
        this.apply(
            new {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event(
                this.aggregateRoots.map({{ toCamelCase schema.moduleName }} =>
                    new {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event(
                        {{#each schema.properties.aggregate}}
                        {{#if (isAllowProperty ../schema.moduleName this) }}
                        {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                        {{/if}}
                        {{/each}}
                    ),
                ),
            ),
        );
    }
    {{/notInArray}}
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleNames) '.event.ts'}}
    deleted(): void
    {
        this.apply(
            new {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}Event(
                this.aggregateRoots.map({{ toCamelCase schema.moduleName }} =>
                    new {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event(
                        {{#each schema.properties.aggregate}}
                        {{#if (isAllowProperty ../schema.moduleName this) }}
                        {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                        {{/if}}
                        {{/each}}
                    ),
                ),
            ),
        );
    }
    {{/notInArray}}
    {{/notInArray}}
}
