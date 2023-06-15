{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items='EventPublisher' path='@nestjs/cqrs')
            (object items='CQMetadata' path=config.auroraCorePackage)
            (object items=(sumStrings 'I' (toPascalCase schema.moduleName) 'Repository') path=(sumStrings '../../domain/' toKebabCase schema.moduleName '.repository'))
            (object items=schema.aggregateName path=(sumStrings '../../domain/' toKebabCase schema.moduleName '.aggregate'))
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
    (object items=(array 'ConflictException' 'NotFoundException') path='@nestjs/common')
    (object items=(sumStrings 'I' (toPascalCase schema.moduleName) 'I18nRepository') path=(sumStrings '../../domain/' toKebabCase schema.moduleName '-i18n.repository'))
    (object items='* as _' path='lodash' defaultImport=true)
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class Create{{ toPascalCase schema.moduleName }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(
        payload: {
            {{#each schema.properties.createService}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}: {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }};
            {{/if}}
            {{/each}}
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        {{#if schema.properties.hasI18n}}
        const fallbackLang = cQMetadata.meta.fallbackLang;
        const contentLanguage = cQMetadata.meta.contentLanguage;

        // override langId value object with header content-language value
        payload.langId = new {{ toPascalCase schema.moduleName }}I18nLangId(contentLanguage.id);

        {{/if}}
        // create aggregate with factory pattern
        const {{ toCamelCase schema.moduleName }} = {{ schema.aggregateName }}.register(
            {{#each schema.properties.aggregate}}
            {{#unless isI18n}}
{{#eq name 'createdAt'}}
            new {{ toPascalCase ../schema.moduleName }}CreatedAt({ currentTimestamp: true }),
{{else eq name 'updatedAt'}}
            new {{ toPascalCase ../schema.moduleName }}UpdatedAt({ currentTimestamp: true }),
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
                {{#if schema.properties.hasI18n}}
                {
                    constraint: {
                        include: [
                            {
                                association: '{{ toCamelCase schema.moduleName }}I18n',
                                where      : {
                                    langId: fallbackLang.id,
                                },
                            },
                        ],
                    },
                },
                {{/if}}
            );

            // eslint-disable-next-line max-len
            if ({{ toCamelCase schema.moduleName }}InDB.availableLangs.value.includes(contentLanguage.id)) throw new ConflictException(`Error to create {{ schema.aggregateName }}, the id ${contentLanguage.id} already exist in database`);

            // add available lang when create country
            {{ toCamelCase schema.moduleName }}.availableLangs = new {{ toPascalCase schema.moduleName }}AvailableLangs(_.union({{ toCamelCase schema.moduleName }}InDB.availableLangs.value, [contentLanguage.id]));

            await this.repository
                .update(
                    {{ toCamelCase schema.moduleName }},
                    {
                        dataFactory   : aggregate => _.pick(aggregate.toDTO(), 'id', 'availableLangs'),
                        updateOptions : cQMetadata?.repositoryOptions,
                        queryStatement: {
                            where: {
                                id: {{ toCamelCase schema.moduleName }}.id.value,
                            },
                        },
                    },
                );
        }
        catch (error)
        {
            if (error instanceof NotFoundException)
            {
                {{ toCamelCase schema.moduleName }}.availableLangs = new {{ toPascalCase schema.moduleName }}AvailableLangs([contentLanguage.id]);
                await this.repository
                    .create(
                        {{ toCamelCase schema.moduleName }},
                        {
                            createOptions: cQMetadata?.repositoryOptions,
                        },
                    );
            }
        }

        // save new i18n record
        await this.repositoryI18n.create(
            {{ toCamelCase schema.moduleName }},
            {
                dataFactory         : (aggregate: {{ schema.aggregateName }} ) => aggregate.toI18nDTO(),
                finderQueryStatement: (aggregate: {{ schema.aggregateName }} ) => ({
                    where: {
                        {{ toCamelCase schema.moduleName }}Id: aggregate['id']['value'],
                        langId: aggregate['langId']['value'],
                    },
                }),
                createOptions: cQMetadata?.repositoryOptions,
            },
        );
        {{else}}
        await this.repository.create(
            {{ toCamelCase schema.moduleName }},
            {
                createOptions: cQMetadata?.repositoryOptions,
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