{{
    setVar 'importsArray' (
        array
            (object items='Injectable' path='@nestjs/common')
            (object items='EventPublisher' path='@nestjs/cqrs')
            (object items=(array 'QueryStatement' 'CQMetadata') path=config.auroraCorePackage)
            (object items=(sumStrings 'I' (toPascalCase schema.moduleName) 'Repository') path=(sumStrings '../../domain/' toKebabCase schema.moduleName '.repository'))
            (object items=(sumStrings 'Add' (toPascalCase schema.moduleNames) 'ContextEvent') path=(sumStrings '../events/add-' toKebabCase schema.moduleNames '-context.event'))
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(sumStrings 'I' (toPascalCase schema.moduleName) 'I18nRepository') path=(sumStrings '../../domain/' toKebabCase schema.moduleName '-i18n.repository'))
    (object items='Operator' path=config.auroraCorePackage)
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class Delete{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
        {{> declareI18nRepository}}
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        {{#if schema.properties.hasI18n}}
        const fallbackLang = cQMetadata.meta.fallbackLang;
        const contentLanguage = cQMetadata.meta.contentLanguage;

        {{/if}}
        // get objects to delete
        const {{ toCamelCase schema.moduleNames }} = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if ({{ toCamelCase schema.moduleNames }}.length === 0) return;

        {{#if schema.properties.hasI18n}}
        if ({{ toCamelCase schema.moduleNames }}[0].langId.value === fallbackLang.id)
        {
            // delete all translations if delete fallback language
            await this.repository.delete({
                queryStatement,
                constraint,
                cQMetadata,
                deleteOptions: cQMetadata?.repositoryOptions,
            });

            await this.repositoryI18n.delete({
                queryStatement: {
                    where: {
                        {{ toCamelCase schema.moduleName }}Id: {
                            [Operator.in]: {{ toCamelCase schema.moduleNames }}.map(item => item.id),
                        },
                    },
                },
                deleteOptions: cQMetadata?.repositoryOptions,
            });
        }
        else
        {
            await this.repositoryI18n.delete({
                queryStatement: {
                    where: {
                        {{ toCamelCase schema.moduleName }}Id: {
                            [Operator.in]: {{ toCamelCase schema.moduleNames }}.map(item => item.id),
                        },
                        langId: contentLanguage.id,
                    },
                },
                deleteOptions: cQMetadata?.repositoryOptions,
            });
        }
        {{else}}
        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });
        {{/if}}

        // create Add{{ toPascalCase schema.moduleNames }}ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const {{ toCamelCase schema.moduleNames }}Registered = this.publisher.mergeObjectContext(
            new Add{{ toPascalCase schema.moduleNames }}ContextEvent({{ toCamelCase schema.moduleNames }}),
        );

        {{ toCamelCase schema.moduleNames }}Registered.deleted(); // apply event to model events
        {{ toCamelCase schema.moduleNames }}Registered.commit(); // commit all events of model
    }
}