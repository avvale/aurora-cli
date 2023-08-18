/* eslint-disable @typescript-eslint/no-unused-vars */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule')  path='@nestjs/testing')
            (object items=(array 'ICommandBus' 'IQueryBus') path=config.auroraCorePackage)
            (object items=(sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')  path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Handler') path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
    )
~}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{
    push importsArray
        (object items=(array 'CACHE_MANAGER' 'CacheModule') path='@nestjs/cache-manager')
        (object items='ConfigService' path='@nestjs/config')
        (object items=(array 'CoreAddI18nConstraintService' 'CoreGetContentLanguageObjectService' 'CoreGetFallbackLangService' 'CoreGetSearchKeyLangService') path=config.auroraCorePackage)
        (object items='commonMockLangData' path=(sumStrings config.appContainer '/common/lang'))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler', () =>
{
    let handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if (hasI18nProperties schema.aggregateProperties) }}
                CacheModule.register(),
                {{/if}}
            ],
            providers: [
                {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler,
                {{#if (hasI18nProperties schema.aggregateProperties) }}
                CoreAddI18nConstraintService,
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_FALLBACK_LANG' ? 'es' : '',
                    },
                },
                {
                    provide : CACHE_MANAGER,
                    useValue: {
                        get: (key: string) => key === 'common/langs' ? commonMockLangData : null,
                    },
                },
                {{/if}}
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
                {{#if (hasI18nProperties schema.aggregateProperties) }}
                {
                    provide : CoreGetContentLanguageObjectService,
                    useValue: {
                        get: () => ({
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
                        }),
                    },
                },
                {
                    provide : CoreGetSearchKeyLangService,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
                {
                    provide : CoreGetFallbackLangService,
                    useValue: {
                        get: () => ({
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
                        }),
                    },
                },
                {{/if}}
            ],
        })
            .compile();

        handler = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0])));
            expect(
                await handler.main(
                    {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0],
                    'Europe/Madrid',
                    {{#if (hasI18nProperties schema.aggregateProperties) }}
                    'en',
                    {{/if}}
                ),
            )
                .toBe({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0]);
        });
    });
});
