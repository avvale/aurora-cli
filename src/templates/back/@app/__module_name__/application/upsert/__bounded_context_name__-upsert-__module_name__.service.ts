{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items='EventPublisher' path='@nestjs/cqrs')
            (object items=(array 'CQMetadata' 'Utils') path=config.auroraCorePackage)
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
{{#each (getValueObjectsProperties schema.aggregateProperties) }}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../importsArray
        (object
            items=(sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase (getNameProperty this)))
            path=(sumStrings ../config.appContainer '/' (toKebabCase ../schema.boundedContextName) '/' (toKebabCase ../schema.moduleName) '/domain/value-objects')
            oneRowByItem=true
        )
~}}
{{/if}}
{{/each}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{
    push importsArray
        (object items=(array 'ConflictException' 'NotFoundException') path='@nestjs/common')
        (object items=(sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'I18nRepository') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
        (object items='* as _' path='lodash' defaultImport=true)
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(
        payload: {
            {{#each (getUpsertServiceProperties schema.aggregateProperties schema.moduleName) }}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{#unless (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
            {{ toCamelCase (getNameProperty this) }}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }};
            {{/unless}}
            {{/if}}
            {{/each}}
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        {{#if (hasI18nProperties schema.aggregateProperties) }}
        const contentLanguage = cQMetadata.meta.contentLanguage;

        // override langId value object with header content-language value
        payload.langId = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18nLangId(contentLanguage.id);

        {{/if}}
        // upsert aggregate with factory pattern
        const {{ toCamelCase schema.moduleName }} = {{ schema.aggregateName }}.register(
            {{#each (getAggregateProperties schema.aggregateProperties) }}
            {{#unless isI18n}}
{{#eq (getNameProperty this) 'createdAt'}}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
{{else eq (getNameProperty this) 'updatedAt'}}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq (getNameProperty this) 'deletedAt'}}
            null, // deletedAt
{{else}}
{{#if (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
            null, // availableLangs
{{else}}
            payload.{{ toCamelCase (getNameProperty this) }},
{{/if}}
{{/eq}}
            {{/unless}}
            {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
            payload.{{ toCamelCase (getNameProperty this) }},
            {{/and}}
            {{/each}}
        );

        {{#if (hasI18nProperties schema.aggregateProperties) }}
        try
        {
            // try get object from database
            const {{ toCamelCase schema.moduleName }}InDB = await this.repository.findById(
                {{ toCamelCase schema.moduleName }}.id,
                {
                    constraint: {
                        include: ['{{ toCamelCase schema.moduleName }}I18n'],
                    },
                },
            );

            if ({{ toCamelCase schema.moduleName }}InDB.availableLangs.value.includes(contentLanguage.id)) throw new ConflictException(`Error to upsert {{ schema.aggregateName }}, the id ${contentLanguage.id} already exist in database`);

            // add new lang id to data lang field to upsert field
            {{ toCamelCase schema.moduleName }}.availableLangs = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}AvailableLangs(_.union({{ toCamelCase schema.moduleName }}InDB.availableLangs.value, [contentLanguage.id]));
            await this.repository.update(
                {{ toCamelCase schema.moduleName }},
                {
                    dataFactory  : aggregate => _.pick(aggregate.toI18nDTO(), 'id', 'availableLangs'),
                    updateOptions: cQMetadata?.repositoryOptions,
                },
            );
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                {{ toCamelCase schema.moduleName }}.availableLangs = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}AvailableLangs([contentLanguage.id]);
                await this.repository
                    .upsert(
                        {{ toCamelCase schema.moduleName }},
                        {
                            upsertOptions: cQMetadata?.repositoryOptions,
                        },
                    );
            }
        }

        const modelInDB = await this.repositoryI18n
            .find({
                queryStatement: {
                    where: {
                        {{ toCamelCase schema.moduleName }}Id: {{ toCamelCase schema.moduleName }}.id.value,
                        langId: contentLanguage.id,
                    },
                },
            });

        // upsert i18n aggregate with factory pattern for upsert repository method
        const {{ toCamelCase schema.moduleName }}I18n = {{ schema.aggregateName }}.register(
            {{#each (getAggregateProperties schema.aggregateProperties) }}
            {{#unless isI18n}}
{{#eq (getNameProperty this) 'createdAt'}}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
{{else eq (getNameProperty this) 'updatedAt'}}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq (getNameProperty this) 'deletedAt'}}
            null, // deletedAt
{{else}}
{{#if (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
            {{ toCamelCase ../schema.moduleName }}.availableLangs,
{{else}}
{{#eq (getNameProperty this) 'id'}}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}Id(modelInDB ? modelInDB.id.value : Utils.uuid()),
{{else}}
            payload.{{ toCamelCase (getNameProperty this) }},
{{/eq}}
{{/if}}
{{/eq}}
            {{/unless}}
            {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
            payload.{{ toCamelCase (getNameProperty this) }},
            {{/and}}
            {{/each}}
        );

        // save new i18n record
        await this.repositoryI18n
            .upsert(
                {{ toCamelCase schema.moduleName }}I18n,
                {
                    dataFactory  : (aggregate: {{ schema.aggregateName }} ) => aggregate.toI18nDTO(),
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );
        {{else}}
        await this.repository
            .upsert(
                {{ toCamelCase schema.moduleName }},
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );
        {{/if}}

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const {{ toCamelCase schema.moduleName }}Register = this.publisher.mergeObjectContext(
            {{ toCamelCase schema.moduleName }},
        );

        {{ toCamelCase schema.moduleName }}Register.created({{ toCamelCase schema.moduleName }}); // apply event to model events
        {{ toCamelCase schema.moduleName }}Register.commit(); // commit all events of model
    }
}
