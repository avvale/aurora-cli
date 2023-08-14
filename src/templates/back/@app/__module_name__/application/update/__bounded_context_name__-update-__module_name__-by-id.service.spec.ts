/* eslint-disable @typescript-eslint/no-unused-vars */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object items=(array 'CommandBus' 'EventBus' 'EventPublisher' 'UnhandledExceptionBus') path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        (sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdService')
                        (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Repository')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{
    push importsArray
        (object items=(sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'I18nRepository') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService', () =>
{
    let service: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService,
                {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
                {{#if schema.properties.hasI18n}}
                {
                    provide : {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
                {{/if}}
            ],
        })
            .compile();

        service = module.get({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a {{ toCamelCase schema.moduleName }} and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        {{#each schema.properties.updateService}}
                        {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0].{{ toCamelCase name }}),
                        {{/each}}
                    },
                    {},
                    {{#if schema.properties.hasI18n}}
                    {
                        meta: {
                            contentLanguage: {
                                id        : '7c4754e7-3363-48ca-af99-632522226b51',
                                name      : 'English',
                                image     : 'us',
                                iso6392   : 'en',
                                iso6393   : 'eng',
                                ietf      : 'en-US',
                                customCode: null,
                                dir       : 'RTL',
                                sort      : 0,
                                isActive  : true,
                            },
                        },
                    },
                    {{/if}}
                ),
            ).toBe(undefined);
        });
    });
});
