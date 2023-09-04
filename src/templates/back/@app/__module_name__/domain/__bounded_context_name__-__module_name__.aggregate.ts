/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'AggregateRoot') path='@nestjs/cqrs')
            (object items=(array 'LiteralObject' 'Utils') path=config.auroraCorePackage)
    )
~}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleNames) '.event.ts'}}
{{
    push importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.boundedContextName) 'Created' (toPascalCase schema.moduleName) 'Event')
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
~}}
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleNames) '.event.ts'}}
{{
    push importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.boundedContextName) 'Deleted' (toPascalCase schema.moduleName) 'Event')
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
~}}
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleNames) '.event.ts'}}
{{
    push importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.boundedContextName) 'Updated' (toPascalCase schema.moduleName) 'Event')
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
~}}
{{/notInArray}}
{{#each (getWithImportRelationshipOneToOneProperties schema.aggregateProperties) }}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=relationship.aggregateName
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
                items=relationship.aggregateName
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/each}}
{{#each (getWithImportRelationshipManyToOneProperties schema.aggregateProperties) }}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=relationship.aggregateName
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
                items=relationship.aggregateName
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/unless}}
{{/each}}
{{#each (getWithImportRelationshipOneToManyProperties schema.aggregateProperties) }}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=relationship.aggregateName
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
                items=relationship.aggregateName
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/each}}
{{#each (getWithImportRelationshipManyToManyProperties schema.aggregateProperties)}}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=relationship.aggregateName
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
                items=relationship.aggregateName
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/each}}
{{#each (getValueObjectsProperties schema.aggregateProperties) }}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../importsArray
        (object 
            items=
                (sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase (getPropertyName this)))
                path=(sumStrings ../config.appContainer '/' (toKebabCase ../schema.boundedContextName) '/' (toKebabCase ../schema.moduleName) '/domain/value-objects')
                oneRowByItem=true
        )
~}}
{{/if}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
export class {{ schema.aggregateName }} extends AggregateRoot
{
    {{#each (getAggregateProperties schema.aggregateProperties) }}
    {{#if (isAllowProperty ../schema.moduleName this)}}
    {{ toCamelCase (getPropertyName this) }}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getPropertyName this) }};
    {{/if}}
    {{/each}}

    // eager relationship
    {{#each (getWithRelationshipOneToOneWithRelationshipFieldProperties schema.aggregateProperties) }}
    {{ toCamelCase relationship.field }}: {{ toPascalCase relationship.aggregateName }};
    {{/each}}
    {{#each (getWithRelationshipOneToOneWithoutRelationshipFieldProperties schema.aggregateProperties) }}
    {{ toCamelCase name }}: {{ toPascalCase relationship.aggregateName }};
    {{/each}}
    {{#each (getWithRelationshipManyToOneProperties schema.aggregateProperties) }}
    {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
    {{ toCamelCase relationship.field }}: {{ toPascalCase relationship.aggregateName }};
    {{/unless}}
    {{/each}}
    {{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
    {{ toCamelCase name }}: {{ toPascalCase relationship.aggregateName }}[];
    {{/each}}
    {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
    {{ toCamelCase name }}: {{ toPascalCase relationship.aggregateName }}[];
    {{/each}}

    constructor(
        {{#each (getAggregateProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        {{ toCamelCase (getPropertyName this) }}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getPropertyName this) }},
        {{/if}}
        {{/each}}

        {{#each (getWithRelationshipOneToOneWithRelationshipFieldProperties schema.aggregateProperties) }}
        {{ toCamelCase relationship.field }}?: {{ toPascalCase relationship.aggregateName }},
        {{/each}}
        {{#each (getWithRelationshipOneToOneWithoutRelationshipFieldProperties schema.aggregateProperties) }}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }},
        {{/each}}
        {{#each (getWithRelationshipManyToOneProperties schema.aggregateProperties) }}
        {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
        {{ toCamelCase relationship.field }}?: {{ toPascalCase relationship.aggregateName }},
        {{/unless}}
        {{/each}}
        {{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }}[],
        {{/each}}
        {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }}[],
        {{/each}}
    )
    {
        super();
        {{#each (getAggregateProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        this.{{ toCamelCase (getPropertyName this) }} = {{ toCamelCase (getPropertyName this) }};
        {{/if}}
        {{/each}}

        // eager relationship
        {{#each (getWithRelationshipOneToOneWithRelationshipFieldProperties schema.aggregateProperties) }}
        this.{{ toCamelCase relationship.field }} = {{ toCamelCase relationship.field }};
        {{/each}}
        {{#each (getWithRelationshipOneToOneWithoutRelationshipFieldProperties schema.aggregateProperties) }}
        this.{{ toCamelCase name }} = {{ toCamelCase name }};
        {{/each}}
        {{#each (getWithRelationshipManyToOneProperties schema.aggregateProperties) }}
        {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
        this.{{ toCamelCase relationship.field }} = {{ toCamelCase relationship.field }};
        {{/unless}}
        {{/each}}
        {{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
        this.{{ toCamelCase name }} = {{ toCamelCase name }};
        {{/each}}
        {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
        this.{{ toCamelCase name }} = {{ toCamelCase name }};
        {{/each}}
    }

    static register(
        {{#each (getAggregateProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        {{ toCamelCase (getPropertyName this) }}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getPropertyName this) }},
        {{/if}}
        {{/each}}

        {{#each (getWithRelationshipOneToOneWithRelationshipFieldProperties schema.aggregateProperties) }}
        {{ toCamelCase relationship.field }}?: {{ toPascalCase relationship.aggregateName }},
        {{/each}}
        {{#each (getWithRelationshipOneToOneWithoutRelationshipFieldProperties schema.aggregateProperties) }}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }},
        {{/each}}
        {{#each (getWithRelationshipManyToOneProperties schema.aggregateProperties) }}
        {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
        {{ toCamelCase relationship.field }}?: {{ toPascalCase relationship.aggregateName }},
        {{/unless}}
        {{/each}}
        {{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }}[],
        {{/each}}
        {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
        {{ toCamelCase name }}?: {{ toPascalCase relationship.aggregateName }}[],
        {{/each}}
    ): {{ schema.aggregateName }}
    {
        return new {{ schema.aggregateName }}(
            {{#each (getAggregateProperties schema.aggregateProperties) }}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getPropertyName this) }},
            {{/if}}
            {{/each}}

            {{#each (getWithRelationshipOneToOneWithRelationshipFieldProperties schema.aggregateProperties) }}
            {{ toCamelCase relationship.field }},
            {{/each}}
            {{#each (getWithRelationshipOneToOneWithoutRelationshipFieldProperties schema.aggregateProperties) }}
            {{ toCamelCase name }},
            {{/each}}
            {{#each (getWithRelationshipManyToOneProperties schema.aggregateProperties) }}
            {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase relationship.field }},
            {{/unless}}
            {{/each}}
            {{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
            {{ toCamelCase name }},
            {{/each}}
            {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
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
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getPropertyName this) }}{{#if nullable}}?{{/if}}.value,
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
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getPropertyName this) }}?.value,
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
                {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getPropertyName this) }}{{#if nullable}}?{{/if}}.value,
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
            {{ toCamelCase (getPropertyName this) }}: this.{{ toCamelCase (getPropertyName this) }}{{#if nullable }}?{{/if}}.value,
            {{/if}}
            {{/each}}

            // eager relationship
            {{#each (getWithRelationshipOneToOneWithRelationshipFieldProperties schema.aggregateProperties) }}
            {{ toCamelCase relationship.field }}: this.{{ toCamelCase relationship.field }}?.toDTO(),
            {{/each}}
            {{#each (getWithRelationshipOneToOneWithoutRelationshipFieldProperties schema.aggregateProperties) }}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.toDTO(),
            {{/each}}
            {{#each (getWithRelationshipManyToOneProperties schema.aggregateProperties) }}
            {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase relationship.field }}: this.{{ toCamelCase relationship.field }}?.toDTO(),
            {{/unless}}
            {{/each}}
            {{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.map(item => item.toDTO()),
            {{/each}}
            {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
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
            {{#eq (getPropertyName this) 'id'}}
            {{ toCamelCase (getPropertyName this) }}: Utils.uuid(),
            {{else}}
            {{#if (isI18nRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase (getPropertyName this) }}: this.id.value,
            {{else}}
            {{ toCamelCase (getPropertyName this) }}: this.{{ toCamelCase (getPropertyName this) }}{{#if nullable }}?{{/if}}.value,
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
            {{#if (isBinaryProperty this) }}
            {{ toCamelCase (getPropertyName this) }}: this.{{ toCamelCase (getPropertyName this) }}{{#if nullable }}?{{/if}}.buffer,
            {{else}}
            {{ toCamelCase (getPropertyName this) }}: this.{{ toCamelCase (getPropertyName this) }}{{#if nullable }}?{{/if}}.value,
            {{/if}}
            {{/if}}
            {{/each}}

            // eager relationship
            {{#each (getWithRelationshipOneToOneWithRelationshipFieldProperties schema.aggregateProperties) }}
            {{ toCamelCase relationship.field }}: this.{{ toCamelCase relationship.field }}?.toDTO(),
            {{/each}}
            {{#each (getWithRelationshipOneToOneWithoutRelationshipFieldProperties schema.aggregateProperties) }}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.toDTO(),
            {{/each}}
            {{#each (getWithRelationshipManyToOneProperties schema.aggregateProperties) }}
            {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
            {{ toCamelCase relationship.field }}: this.{{ toCamelCase relationship.field }}?.toDTO(),
            {{/unless}}
            {{/each}}
            {{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.map(item => item.toDTO()),
            {{/each}}
            {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
            {{ toCamelCase name }}: this.{{ toCamelCase name }}?.map(item => item.toDTO()),
            {{/each}}
        };
    }
}
