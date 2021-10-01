import { AggregateRoot } from '@nestjs/cqrs';
import {
    {{#each schema.properties.valueObjects}}
    {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
    {{/each}}
} from './value-objects';
{{#notInArray schema.excluded 'src/@hades/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Created{{ toPascalCase schema.moduleName }}Event } from './../application/events/created-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/@hades/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Updated{{ toPascalCase schema.moduleName }}Event } from './../application/events/updated-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/@hades/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
import { Deleted{{ toPascalCase schema.moduleName }}Event } from './../application/events/deleted-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#each schema.properties.withRelationshipOneToOne}}
import { {{ relationshipAggregate }} } from '@hades/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate';
{{/each}}
{{#each schema.properties.withRelationshipManyToOne}}
import { {{ relationshipAggregate }} } from '@hades/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate';
{{/each}}
{{#each schema.properties.withRelationshipOneToMany}}
import { {{ relationshipAggregate }} } from '@hades/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate';
{{/each}}
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ relationshipAggregate }} } from '@hades/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.aggregate';
{{/each}}

export class {{ schema.aggregateName }} extends AggregateRoot
{
    {{#each schema.properties.aggregate}}
    {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }};
    {{/each}}

    // eager relationship
    {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
    {{ toCamelCase relationshipField }}: {{ toPascalCase relationshipAggregate }};
    {{/each}}
    {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
    {{ toCamelCase nativeName }}: {{ toPascalCase relationshipAggregate }};
    {{/each}}
    {{#each schema.properties.withRelationshipManyToOne}}
    {{ toCamelCase relationshipField }}: {{ toPascalCase relationshipAggregate }};
    {{/each}}
    {{#each schema.properties.withRelationshipOneToMany}}
    {{ toCamelCase nativeName }}: {{ toPascalCase relationshipAggregate }}[];
    {{/each}}
    {{#each schema.properties.withRelationshipManyToMany}}
    {{ toCamelCase nativeName }}: {{ toPascalCase relationshipAggregate }}[];
    {{/each}}

    constructor(
        {{#each schema.properties.aggregate}}
        {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
    )
    {
        super();

        {{#each schema.properties.aggregate}}
        this.{{ toCamelCase name }} = {{ toCamelCase name }};
        {{/each}}

        // eager relationship
        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        this.{{ toCamelCase relationshipField }} = {{ toCamelCase relationshipField }};
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        this.{{ toCamelCase nativeName }} = {{ toCamelCase nativeName }};
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        this.{{ toCamelCase relationshipField }} = {{ toCamelCase relationshipField }};
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        this.{{ toCamelCase nativeName }} = {{ toCamelCase nativeName }};
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        this.{{ toCamelCase nativeName }} = {{ toCamelCase nativeName }};
        {{/each}}
    }

    static register (
        {{#each schema.properties.aggregate}}
        {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        {{ toCamelCase relationshipField }}?: {{ toPascalCase relationshipAggregate }},
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        {{ toCamelCase nativeName }}?: {{ toPascalCase relationshipAggregate }}[],
        {{/each}}
    ): {{ schema.aggregateName }}
    {
        return new {{ schema.aggregateName }}(
            {{#each schema.properties.aggregate}}
            {{ toCamelCase name }},
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
            {{ toCamelCase relationshipField }},
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
            {{ toCamelCase nativeName }},
            {{/each}}
            {{#each schema.properties.withRelationshipManyToOne}}
            {{ toCamelCase relationshipField }},
            {{/each}}
            {{#each schema.properties.withRelationshipOneToMany}}
            {{ toCamelCase nativeName }},
            {{/each}}
            {{#each schema.properties.withRelationshipManyToMany}}
            {{ toCamelCase nativeName }},
            {{/each}}
        );
    }

    {{#notInArray schema.excluded 'src/@hades/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
    created({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new Created{{ toPascalCase schema.moduleName }}Event(
                {{#each schema.properties.aggregate}}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                {{/each}}
            )
        );
    }
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/@hades/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleName) '.event.ts'}}
    updated({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new Updated{{ toPascalCase schema.moduleName }}Event(
                {{#each schema.properties.aggregate}}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}.value,
                {{/each}}
            )
        );
    }
    {{/notInArray}}

    {{#notInArray schema.excluded 'src/@hades/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
    deleted({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): void
    {
        this.apply(
            new Deleted{{ toPascalCase schema.moduleName }}Event(
                {{#each schema.properties.aggregate}}
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}{{#if nullable}}?{{/if}}.value,
                {{/each}}
            )
        );
    }
    {{/notInArray}}

    toDTO(): Object
    {
        return {
            {{#each schema.properties.aggregate}}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}{{#if nullable }}?{{/if}}.value,
            {{/each}}

            // eager relationship
            {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
            {{ toCamelCase relationshipField }}: this.{{ toCamelCase relationshipField }}?.toDTO(),
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
            {{ toCamelCase nativeName }}: this.{{ toCamelCase nativeName }}?.toDTO(),
            {{/each}}
            {{#each schema.properties.withRelationshipManyToOne}}
            {{ toCamelCase relationshipField }}: this.{{ toCamelCase relationshipField }}?.toDTO(),
            {{/each}}
            {{#each schema.properties.withRelationshipOneToMany}}
            {{ toCamelCase nativeName }}: this.{{ toCamelCase nativeName }}?.map(item => item.toDTO()),
            {{/each}}
            {{#each schema.properties.withRelationshipManyToMany}}
            {{ toCamelCase nativeName }}: this.{{ toCamelCase nativeName }}?.map(item => item.toDTO()),
            {{/each}}
        }
    }
}
