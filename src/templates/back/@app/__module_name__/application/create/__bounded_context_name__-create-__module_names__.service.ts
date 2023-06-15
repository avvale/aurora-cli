{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items='EventPublisher' path='@nestjs/cqrs')
            (object items='CQMetadata' path=config.auroraCorePackage)
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository') path=(sumStrings '../../domain/'(toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.repository'))
            (object items=schema.aggregateName path=(sumStrings '../../domain/' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.aggregate'))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Add' (toPascalCase schema.moduleNames) 'ContextEvent') path=(sumStrings '../events/' (toKebabCase schema.boundedContextName) '-add-' (toKebabCase schema.moduleNames) '-context.event'))
    )
~}}
{{#each schema.properties.valueObjects}}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{ push ../importsArray
    (object items=(sumStrings (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase name)) path='../../domain/value-objects' oneRowByItem=true)
~}}
{{/if}}
{{/each}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'I18nRepository') path=(sumStrings '../../domain/' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '-i18n.repository'))
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
        {{ toCamelCase schema.moduleNames }}: {
            {{#each schema.properties.createItemsService}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
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
            {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
            {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }},
            {{/and}}
            {{/each}}
        ));

        // insert
        {{#if schema.properties.hasI18n}}
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