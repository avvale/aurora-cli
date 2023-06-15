{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items='EventPublisher' path='@nestjs/cqrs')
            (object items=(array 'QueryStatement' 'CQMetadata') path=config.auroraCorePackage)
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository') path=(sumStrings '../../domain/' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.repository'))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Id') path='../../domain/value-objects')
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'I18nRepository') path=(sumStrings '../../domain/' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '-i18n.repository'))
    (object items=(sumStrings (toPascalCase schema.boundedContextName)(toPascalCase schema.moduleName) 'AvailableLangs') path='../../domain/value-objects')
    (object items='* as _' path='lodash' defaultImport=true)
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(
        id: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Id,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        {{#if schema.properties.hasI18n}}
        const fallbackLang = cQMetadata.meta.fallbackLang;
        const contentLanguage = cQMetadata.meta.contentLanguage;

        {{/if}}
        // get object to delete
        const {{ toCamelCase schema.moduleName }} = await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );

        {{#if schema.properties.hasI18n}}
        if ({{ toCamelCase schema.moduleName }}.langId.value === fallbackLang.id)
        {
            // delete all translations if delete fallback language
            await this.repository.deleteById(
                {{ toCamelCase schema.moduleName }}.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

            await this.repositoryI18n.delete(
                {
                    queryStatement: {
                        where: {
                            {{ toCamelCase schema.moduleName }}Id: {{ toCamelCase schema.moduleName }}.id.value,
                        },
                    },
                    deleteOptions: cQMetadata?.repositoryOptions,
                },
            );
        }
        else
        {
            // delete only one translation
            await this.repositoryI18n.delete(
                {
                    queryStatement: {
                        where: {
                            {{ toCamelCase schema.moduleName }}Id: {{ toCamelCase schema.moduleName }}.id.value,
                            langId   : contentLanguage.id,
                        },
                    },
                    deleteOptions: cQMetadata?.repositoryOptions,
                },
            );

            // update available langs when delete translation
            {{ toCamelCase schema.moduleName }}.availableLangs = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}AvailableLangs({{ toCamelCase schema.moduleName }}.availableLangs.value.removeItem(contentLanguage.id));

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
        {{else}}
        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(
            {{ toCamelCase schema.moduleName }}.id,
            {
                deleteOptions: cQMetadata?.repositoryOptions,
                cQMetadata,
            },
        );
        {{/if}}

        // insert EventBus in object, to be able to apply and commit events
        const {{ toCamelCase schema.moduleName }}Register = this.publisher.mergeObjectContext({{ toCamelCase schema.moduleName }});

        {{ toCamelCase schema.moduleName }}Register.deleted({{ toCamelCase schema.moduleName }}); // apply event to model events
        {{ toCamelCase schema.moduleName }}Register.commit(); // commit all events of model
    }
}