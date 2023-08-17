{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items='EventPublisher' path='@nestjs/cqrs')
            (object items='CQMetadata' path=config.auroraCorePackage)
            (
                object
                    items=
                    (
                        array
                            schema.aggregateName
                            (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository')
                            (sumStrings (toPascalCase schema.boundedContextName) 'Add' (toPascalCase schema.moduleNames) 'ContextEvent')
                    )
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
    )
~}}
{{#each (getValueObjectsProperties schema.aggregateProperties) }}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../importsArray
        (object
            items=(sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase (getPropertyName this)))
            path=(sumStrings ../config.appContainer '/' (toKebabCase ../schema.boundedContextName) '/' (toKebabCase ../schema.moduleName) '/domain/value-objects')
            oneRowByItem=true
        )
~}}
{{/if}}
{{/each}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{
    push importsArray
        (object items=(sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'I18nRepository') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(
        payload: {
            {{#each (getCreateItemsServiceProperties schema.aggregateProperties) }}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getPropertyName this) }}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getPropertyName this) }};
            {{/if}}
            {{/each}}
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregate{{ toPascalCase schema.moduleNames }} = payload.map({{ toCamelCase schema.moduleName }} => {{ schema.aggregateName }}.register(
            {{#each (getAggregateProperties schema.aggregateProperties) }}
            {{#unless isI18n}}
{{#eq (getPropertyName this) 'createdAt'}}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
{{else eq (getPropertyName this) 'updatedAt'}}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq (getPropertyName this) 'deletedAt'}}
            null, // deleteAt
{{else}}
            {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getPropertyName this) }},
{{/eq}}
            {{/unless}}
            {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
            {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getPropertyName this) }},
            {{/and}}
            {{/each}}
        ));

        // insert
        {{#if (hasI18nProperties schema.aggregateProperties) }}
        // delete duplicate elements from multiple languages
        await this.repository.insert(
            aggregate{{ toPascalCase schema.moduleNames }}.filter((country, index, self) => index === self.findIndex(t => t.id.value === country.id.value)),
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        await this.repositoryI18n.insert(
            aggregate{{ toPascalCase schema.moduleNames }},
            {
                dataFactory  : aggregate => aggregate.toI18nDTO(),
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );
        {{else}}
        await this.repository.insert(
            aggregate{{ toPascalCase schema.moduleNames }},
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );
        {{/if}}

        // create Add{{ toPascalCase schema.moduleNames }}ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const {{ toCamelCase schema.moduleNames }}Registered = this.publisher.mergeObjectContext(new {{ toPascalCase schema.boundedContextName }}Add{{ toPascalCase schema.moduleNames }}ContextEvent(aggregate{{ toPascalCase schema.moduleNames }}));

        {{ toCamelCase schema.moduleNames }}Registered.created(); // apply event to model events
        {{ toCamelCase schema.moduleNames }}Registered.commit(); // commit all events of model
    }
}
