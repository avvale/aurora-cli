/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    {{> importValueObjects }}
} from './value-objects';
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleName) '.event.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event } from '../application/events/{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleName) '.event.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event } from '../application/events/{{ toKebabCase schema.boundedContextName }}-updated-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event } from '../application/events/{{ toKebabCase schema.boundedContextName }}-deleted-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#each schema.aggregateProperties.withImportRelationshipOneToOne}}
import { {{ relationship.aggregateName }} } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipManyToOne}}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
import { {{ relationship.aggregateName }} } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/unless}}
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipOneToMany}}
import { {{ relationship.aggregateName }} } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each (getWithImportRelationshipManyToManyProperties schema.aggregateProperties)}}
import { {{ relationship.aggregateName }} } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}

export class {{ schema.aggregateName }} extends AggregateRoot
{
    {{#each (getAggregateProperties schema.aggregateProperties) }}
    {{#if (isAllowProperty ../schema.moduleName this)}}
    {{ toCamelCase (getNameProperty this) }}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }};
    {{/if}}
    {{/each}}

    // eager relationship
    {{#each schema.aggregateProperties.withRelationshipOneToOneWithRelationshipField}}
    {{ toCamelCase relationship.field }}: {{ toPascalCase relationship.aggregateName }};
    {{/each}}
    {{#each schema.aggregateProperties.withRelationshipOneToOneWithoutRelationshipField}}
    {{ toCamelCase name }}: {{ toPascalCase relationship.aggregateName }};
    {{/each}}
    {{#each schema.aggregateProperties.withRelationshipManyToOne}}
    {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
    {{ toCamelCase relationship.field }}: {{ toPascalCase relationship.aggregateName }};
    {{/unless}}
    {{/each}}
    {{#each schema.aggregateProperties.withRelationshipOneToMany}}
    {{ toCamelCase name }}: {{ toPascalCase relationship.aggregateName }}[];
    {{/each}}
    {{#each schema.aggregateProperties.withRelationshipManyToMany}}
    {{ toCamelCase name }}: {{ toPascalCase relationship.aggregateName }}[];
    {{/each}}

    constructor(
        {{#each (getAggregateProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        {{ toCamelCase (getNameProperty this) }}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }},
        {{/if}}
        {{/each}}

        {{#each schema.aggregateProperties.withRelationshipOneToOneWithRelationshipField}}
        {{ toCamelCase relationship.field }}?: {{ toPascalCase relationship.aggregateName }},
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipOneToOneWithoutRelationshipField}}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }},
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipManyToOne}}
        {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
        {{ toCamelCase relationship.field }}?: {{ toPascalCase relationship.aggregateName }},
        {{/unless}}
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipOneToMany}}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }}[],
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipManyToMany}}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }}[],
        {{/each}}
    )
    {
        super();
        {{#each (getAggregateProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        this.{{ toCamelCase (getNameProperty this) }} = {{ toCamelCase (getNameProperty this) }};
        {{/if}}
        {{/each}}

        // eager relationship
        {{#each schema.aggregateProperties.withRelationshipOneToOneWithRelationshipField}}
        this.{{ toCamelCase relationship.field }} = {{ toCamelCase relationship.field }};
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipOneToOneWithoutRelationshipField}}
        this.{{ toCamelCase name }} = {{ toCamelCase name }};
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipManyToOne}}
        {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
        this.{{ toCamelCase relationship.field }} = {{ toCamelCase relationship.field }};
        {{/unless}}
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipOneToMany}}
        this.{{ toCamelCase name }} = {{ toCamelCase name }};
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipManyToMany}}
        this.{{ toCamelCase name }} = {{ toCamelCase name }};
        {{/each}}
    }

    static register (
        {{#each (getAggregateProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        {{ toCamelCase (getNameProperty this) }}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }},
        {{/if}}
        {{/each}}

        {{#each schema.aggregateProperties.withRelationshipOneToOneWithRelationshipField}}
        {{ toCamelCase relationship.field }}?: {{ toPascalCase relationship.aggregateName }},
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipOneToOneWithoutRelationshipField}}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }},
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipManyToOne}}
        {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
        {{ toCamelCase relationship.field }}?: {{ toPascalCase relationship.aggregateName }},
        {{/unless}}
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipOneToMany}}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }}[],
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipManyToMany}}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }}[],
        {{/each}}
    ): {{ schema.aggregateName }}
    {
        return new {{ schema.aggregateName }}(
            {{#each (getAggregateProperties schema.aggregateProperties) }}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getNameProperty this) }},
            {{/if}}
            {{/each}}

            {{#each schema.aggregateProperties.withRelationshipOneToOneWithRelationshipField}}
            {{ toCamelCase relationship.field }},
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToOneWithoutRelationshipField}}
            {{ toCamelCase name }},
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipManyToOne}}
            {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase relationship.field }},
            {{/unless}}
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToMany}}
            {{ toCamelCase name }},
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipManyToMany}}
            {{ toCamelCase name }},
            {{/each}}
        );
    }

    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
    created({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event(
                {{#each (getAggregateProperties schema.aggregateProperties) }}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getNameProperty this) }}{{#if nullable}}?{{/if}}.value,
                {{/if}}
                {{/each}}
            ),
        );
    }
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleName) '.event.ts'}}
    updated({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event(
                {{#each (getAggregateProperties schema.aggregateProperties) }}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getNameProperty this) }}?.value,
                {{/if}}
                {{/each}}
            ),
        );
    }
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
    deleted({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event(
                {{#each (getAggregateProperties schema.aggregateProperties) }}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getNameProperty this) }}{{#if nullable}}?{{/if}}.value,
                {{/if}}
                {{/each}}
            ),
        );
    }
    {{/notInArray}}

    toDTO(): LiteralObject
    {
        return {
            {{#each (getAggregateProperties schema.aggregateProperties) }}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getNameProperty this) }}: this.{{ toCamelCase (getNameProperty this) }}{{#if nullable }}?{{/if}}.value,
            {{/if}}
            {{/each}}

            // eager relationship
            {{#each schema.aggregateProperties.withRelationshipOneToOneWithRelationshipField}}
            {{ toCamelCase relationship.field }}: this.{{ toCamelCase relationship.field }}?.toDTO(),
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToOneWithoutRelationshipField}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.toDTO(),
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipManyToOne}}
            {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase relationship.field }}: this.{{ toCamelCase relationship.field }}?.toDTO(),
            {{/unless}}
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToMany}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.map(item => item.toDTO()),
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipManyToMany}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.map(item => item.toDTO()),
            {{/each}}
        };
    }
    {{#if (hasI18nProperties schema.aggregateProperties) }}

    toI18nDTO(): LiteralObject
    {
        return {
            {{#each (getAggregateProperties schema.aggregateProperties) }}
            {{#if isI18n}}
            {{#eq (getNameProperty this) 'id'}}
            {{ toCamelCase (getNameProperty this) }}: Utils.uuid(),
            {{else}}
            {{#if (isI18nRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase (getNameProperty this) }}: this.id.value,
            {{else}}
            {{ toCamelCase (getNameProperty this) }}: this.{{ toCamelCase (getNameProperty this) }}{{#if nullable }}?{{/if}}.value,
            {{/if}}
            {{/eq}}
            {{/if}}
            {{/each}}
        };
    }
    {{/if}}

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            {{#each (getAggregateProperties schema.aggregateProperties) }}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{#if isBinary }}
            {{ toCamelCase (getNameProperty this) }}: this.{{ toCamelCase (getNameProperty this) }}{{#if nullable }}?{{/if}}.buffer,
            {{else}}
            {{ toCamelCase (getNameProperty this) }}: this.{{ toCamelCase (getNameProperty this) }}{{#if nullable }}?{{/if}}.value,
            {{/if}}
            {{/if}}
            {{/each}}

            // eager relationship
            {{#each schema.aggregateProperties.withRelationshipOneToOneWithRelationshipField}}
            {{ toCamelCase relationship.field }}: this.{{ toCamelCase relationship.field }}?.toDTO(),
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToOneWithoutRelationshipField}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.toDTO(),
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipManyToOne}}
            {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase relationship.field }}: this.{{ toCamelCase relationship.field }}?.toDTO(),
            {{/unless}}
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToMany}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.map(item => item.toDTO()),
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipManyToMany}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.map(item => item.toDTO()),
            {{/each}}
        };
    }
}
