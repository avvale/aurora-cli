/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from '@aurora-ts/core';
import {
    {{> importValueObjects }}
} from './value-objects';
{{#notInArray schema.excluded 'src/' config.applicationsContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Created{{ toPascalCase schema.moduleName }}Event } from '../application/events/created-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.applicationsContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Updated{{ toPascalCase schema.moduleName }}Event } from '../application/events/updated-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.applicationsContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Deleted{{ toPascalCase schema.moduleName }}Event } from '../application/events/deleted-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#each schema.properties.withImportRelationshipOneToOne}}
import { {{ relationshipAggregate }} } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate{{/if}}';
{{/each}}
{{#each schema.properties.withImportRelationshipManyToOne}}
{{#unless (isI18NRelationProperty ../schema.moduleName this)}}
import { {{ relationshipAggregate }} } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate{{/if}}';
{{/unless}}
{{/each}}
{{#each schema.properties.withImportRelationshipOneToMany}}
import { {{ relationshipAggregate }} } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate{{/if}}';
{{/each}}
{{#each schema.properties.withImportRelationshipManyToMany}}
import { {{ relationshipAggregate }} } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate{{/if}}';
{{/each}}

export class {{ schema.aggregateName }} extends AggregateRoot
{
    {{#each schema.properties.aggregate}}
    {{#if (allowProperty ../schema.moduleName this)}}
    {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }};
    {{/if}}
    {{/each}}

    // eager relationship
    {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
    {{ toCamelCase relationshipField }}: {{ toPascalCase relationshipAggregate }};
    {{/each}}
    {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
    {{ toCamelCase originName }}: {{ toPascalCase relationshipAggregate }};
    {{/each}}
    {{#each schema.properties.withRelationshipManyToOne}}
    {{#unless (isI18NRelationProperty ../schema.moduleName this)}}
    {{ toCamelCase relationshipField }}: {{ toPascalCase relationshipAggregate }};
    {{/unless}}
    {{/each}}
    {{#each schema.properties.withRelationshipOneToMany}}
    {{ toCamelCase originName }}: {{ toPascalCase relationshipAggregate }}[];
    {{/each}}
    {{#each schema.properties.withRelationshipManyToMany}}
    {{ toCamelCase originName }}: {{ toPascalCase relationshipAggregate }}[];
    {{/each}}

    constructor(
        {{#each schema.properties.aggregate}}
        {{#if (allowProperty ../schema.moduleName this) }}
        {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }},
        {{/if}}
        {{/each}}

        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        {{ toCamelCase originName }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        {{#unless (isI18NRelationProperty ../schema.moduleName this)}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/unless}}
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        {{ toCamelCase originName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        {{ toCamelCase originName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
    )
    {
        super();
        {{#each schema.properties.aggregate}}
        {{#if (allowProperty ../schema.moduleName this) }}
        this.{{ toCamelCase name }} = {{ toCamelCase name }};
        {{/if}}
        {{/each}}

        // eager relationship
        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        this.{{ toCamelCase relationshipField }} = {{ toCamelCase relationshipField }};
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        this.{{ toCamelCase originName }} = {{ toCamelCase originName }};
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        {{#unless (isI18NRelationProperty ../schema.moduleName this)}}
        this.{{ toCamelCase relationshipField }} = {{ toCamelCase relationshipField }};
        {{/unless}}
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        this.{{ toCamelCase originName }} = {{ toCamelCase originName }};
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        this.{{ toCamelCase originName }} = {{ toCamelCase originName }};
        {{/each}}
    }

    static register (
        {{#each schema.properties.aggregate}}
        {{#if (allowProperty ../schema.moduleName this) }}
        {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }},
        {{/if}}
        {{/each}}

        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        {{ toCamelCase originName }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        {{#unless (isI18NRelationProperty ../schema.moduleName this)}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/unless}}
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        {{ toCamelCase originName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        {{ toCamelCase originName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
    ): {{ schema.aggregateName }}
    {
        return new {{ schema.aggregateName }}(
            {{#each schema.properties.aggregate}}
            {{#if (allowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }},
            {{/if}}
            {{/each}}

            {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
            {{ toCamelCase relationshipField }},
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
            {{ toCamelCase originName }},
            {{/each}}
            {{#each schema.properties.withRelationshipManyToOne}}
            {{#unless (isI18NRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase relationshipField }},
            {{/unless}}
            {{/each}}
            {{#each schema.properties.withRelationshipOneToMany}}
            {{ toCamelCase originName }},
            {{/each}}
            {{#each schema.properties.withRelationshipManyToMany}}
            {{ toCamelCase originName }},
            {{/each}}
        );
    }

    {{#notInArray schema.excluded 'src/' config.applicationsContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
    created({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new Created{{ toPascalCase schema.moduleName }}Event(
                {{#each schema.properties.aggregate}}
                {{#if (allowProperty ../schema.moduleName this) }}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                {{/if}}
                {{/each}}
            ),
        );
    }
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/' config.applicationsContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleName) '.event.ts'}}
    updated({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new Updated{{ toPascalCase schema.moduleName }}Event(
                {{#each schema.properties.aggregate}}
                {{#if (allowProperty ../schema.moduleName this) }}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}?.value,
                {{/if}}
                {{/each}}
            ),
        );
    }
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/' config.applicationsContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
    deleted({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new Deleted{{ toPascalCase schema.moduleName }}Event(
                {{#each schema.properties.aggregate}}
                {{#if (allowProperty ../schema.moduleName this) }}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                {{/if}}
                {{/each}}
            ),
        );
    }
    {{/notInArray}}

    toDTO(): LiteralObject
    {
        return {
            {{#each schema.properties.aggregate}}
            {{#if (allowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}{{#if nullable }}?{{/if}}.value,
            {{/if}}
            {{/each}}

            // eager relationship
            {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
            {{ toCamelCase relationshipField }}: this.{{ toCamelCase relationshipField }}?.toDTO(),
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
            {{ toCamelCase originName }}: this.{{ toCamelCase originName }}?.toDTO(),
            {{/each}}
            {{#each schema.properties.withRelationshipManyToOne}}
            {{#unless (isI18NRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase relationshipField }}: this.{{ toCamelCase relationshipField }}?.toDTO(),
            {{/unless}}
            {{/each}}
            {{#each schema.properties.withRelationshipOneToMany}}
            {{ toCamelCase originName }}: this.{{ toCamelCase originName }}?.map(item => item.toDTO()),
            {{/each}}
            {{#each schema.properties.withRelationshipManyToMany}}
            {{ toCamelCase originName }}: this.{{ toCamelCase originName }}?.map(item => item.toDTO()),
            {{/each}}
        };
    }
    {{#if hasI18n}}

    toI18nDTO(): LiteralObject
    {
        return {
            {{#each schema.properties.aggregate}}
            {{#if isI18n}}
            {{#eq name 'id'}}
            {{ toCamelCase name }}: Utils.uuid(),
            {{else}}
            {{#if (isI18NRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase name }}: this.id.value,
            {{else}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}{{#if nullable }}?{{/if}}.value,
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
            {{#each schema.properties.aggregate}}
            {{#if (allowProperty ../schema.moduleName this) }}
            {{#if isBinary }}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}{{#if nullable }}?{{/if}}.buffer,
            {{else}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}{{#if nullable }}?{{/if}}.value,
            {{/if}}
            {{/if}}
            {{/each}}

            // eager relationship
            {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
            {{ toCamelCase relationshipField }}: this.{{ toCamelCase relationshipField }}?.toDTO(),
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
            {{ toCamelCase originName }}: this.{{ toCamelCase originName }}?.toDTO(),
            {{/each}}
            {{#each schema.properties.withRelationshipManyToOne}}
            {{#unless (isI18NRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase relationshipField }}: this.{{ toCamelCase relationshipField }}?.toDTO(),
            {{/unless}}
            {{/each}}
            {{#each schema.properties.withRelationshipOneToMany}}
            {{ toCamelCase originName }}: this.{{ toCamelCase originName }}?.map(item => item.toDTO()),
            {{/each}}
            {{#each schema.properties.withRelationshipManyToMany}}
            {{ toCamelCase originName }}: this.{{ toCamelCase originName }}?.map(item => item.toDTO()),
            {{/each}}
        };
    }
}
