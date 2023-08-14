{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items='EventPublisher' path='@nestjs/cqrs')
            (object items=(array 'QueryStatement' 'CQMetadata') path=config.auroraCorePackage)
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository')
                        schema.aggregateName
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
    )
~}}
{{#each schema.aggregateProperties.valueObjects}}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../importsArray
        (object items=(sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase name)) path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/domain/value-objects') oneRowByItem=true)
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
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(
        payload: {
            {{#each schema.aggregateProperties.updateService}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }};
            {{/if}}
            {{/each}}
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        {{#if (hasI18nProperties schema.aggregateProperties) }}
        const contentLanguage = cQMetadata.meta.contentLanguage;

        // override langId value object with header content-language value
        payload.langId = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18nLangId(contentLanguage.id);

        {{/if}}
        // create aggregate with factory pattern
        const {{ toCamelCase schema.moduleName }} = {{ schema.aggregateName }}.register(
            {{#each (getAggregateProperties schema.aggregateProperties) }}
            {{#unless isI18n}}
{{#eq name 'createdAt'}}
            null, // createdAt
{{else eq name 'updatedAt'}}
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq name 'deletedAt'}}
            null, // deletedAt
{{else}}
{{#if (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
            null, // availableLangs
{{else}}
            payload.{{ toCamelCase name }},
{{/if}}
{{/eq}}
            {{/unless}}
            {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
            payload.{{ toCamelCase name }},
            {{/and}}
            {{/each}}
        );

        {{#if (hasI18nProperties schema.aggregateProperties) }}
        // delete availableLangs property to avoid overwrite this value in database
        delete {{ toCamelCase schema.moduleName }}.availableLangs;

        {{/if}}
        // update by id
        await this.repository.updateById(
            {{ toCamelCase schema.moduleName }},
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );
        {{#if (hasI18nProperties schema.aggregateProperties) }}

        await this.repositoryI18n.updateById(
            {{toCamelCase schema.moduleName }},
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
                dataFactory      : (aggregate: {{ schema.aggregateName }}) => aggregate.toI18nDTO(),
                findArguments    : {
                    langId: contentLanguage.id,
                    {{ toCamelCase schema.moduleName }}Id: {{ toCamelCase schema.moduleName }}.id.value,
                },
            },
        );
        {{/if}}

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const {{ toCamelCase schema.moduleName }}Register = this.publisher.mergeObjectContext(
            {{ toCamelCase schema.moduleName }},
        );

        {{ toCamelCase schema.moduleName }}Register.updated({{ toCamelCase schema.moduleName }}); // apply event to model events
        {{ toCamelCase schema.moduleName }}Register.commit(); // commit all events of model
    }
}
