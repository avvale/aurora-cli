{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items='EventPublisher' path='@nestjs/cqrs')
            (object items=(array 'CQMetadata' 'Utils') path=config.auroraCorePackage)
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository') path=(sumStrings '../../domain/' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.repository'))
            (object items=schema.aggregateName path=(sumStrings '../../domain/' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.aggregate'))
    )
~}}
{{#each schema.properties.valueObjects}}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{ push ../importsArray
    (object items=(sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase name)) path='../../domain/value-objects' oneRowByItem=true)
~}}
{{/if}}
{{/each}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(array 'ConflictException' 'NotFoundException') path='@nestjs/common')
    (object items=(sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'I18nRepository') path=(sumStrings '../../domain/' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '-i18n.repository'))
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
            {{#each schema.properties.upsertService}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{#unless (isI18nAvailableLangsProperty . ../schema.properties)}}
            {{ toCamelCase name }}: {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }};
            {{/unless}}
            {{/if}}
            {{/each}}
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        {{#if schema.properties.hasI18n}}
        const contentLanguage = cQMetadata.meta.contentLanguage;

        // override langId value object with header content-language value
        payload.langId = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18nLangId(contentLanguage.id);

        {{/if}}
        // upsert aggregate with factory pattern
        const {{ toCamelCase schema.moduleName }} = {{ schema.aggregateName }}.register(
            {{#each schema.properties.aggregate}}
            {{#unless isI18n}}
{{#eq name 'createdAt'}}
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
{{else eq name 'updatedAt'}}
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq name 'deletedAt'}}
            null, // deletedAt
{{else}}
{{#if (isI18nAvailableLangsProperty . ../schema.properties)}}
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

        {{#if schema.properties.hasI18n}}
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
            {{#each schema.properties.aggregate}}
            {{#unless isI18n}}
{{#eq name 'createdAt'}}
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
{{else eq name 'updatedAt'}}
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
{{else eq name 'deletedAt'}}
            null, // deletedAt
{{else}}
{{#if (isI18nAvailableLangsProperty . ../schema.properties)}}
            {{ toCamelCase schema.moduleName }}.availableLangs,
{{else}}
{{#eq name 'id'}}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}Id(modelInDB ? modelInDB.id.value : Utils.uuid()),
{{else}}
            payload.{{ toCamelCase name }},
{{/eq}}
{{/if}}
{{/eq}}
            {{/unless}}
            {{#and isI18n (isAllowProperty ../schema.moduleName this)}}
            payload.{{ toCamelCase name }},
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